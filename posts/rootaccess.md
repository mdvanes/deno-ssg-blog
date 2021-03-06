---
categories:
  - mypc
tags:
  - Code quality
  - Code complexity
---


# Gaining Root Access to Smart Home Gateway



cover






Recently I bought a Risco Smart Home Gateway, and as I expected it is a rebranded off-the-shelf micro computer. 
When delivered, the HDMI and optical S/PDIF outputs and IR input hinted that it was not just a dedicated smart home 
gateway. The OS seems to be loaded from a micro SD card, comparable to e.g. a Raspberry Pi. Also, the z-wave 
controller is just a USB dongle and not built-in.

After configuring, its network interface shows up on my router as SolidRun. A quick search finds the SolidRun CuBox-i, most 
probably the [CuBox i2eX or CuBox i4p](https://developer.solid-run.com/products/cubox-i/), because it also has an eSata port.

These range from $100 - $150. Not too bad, considering the Risco Smart Home Gateway is around €300. Of course, this 
includes a z-wave adapter (around €50) and their special software. Their software is actually much less flexible 
than e.g. [Domoticz](https://www.domoticz.com/), but I am sure it makes up for that in security and robustness.

Solid Run has a [community site](https://developer.solid-run.com) for developers with plenty of information.

The CuBox is an ARM micro computer with an FreeScale i.MX6 SoC and that means it can run several flavors of Linux, 
[Kodi](https://kodi.wiki/view/SolidRun_CuBox-i) and in theory and old version of [Android](http://forum.solid-run.com/android-os-on-cubox-i-and-hummingboard-f6/).
An in-depth review can be found [here](https://www.androidauthority.com/cubox-review-587011/).

I won't judge the performance or review it further, but it might be worth mentioning that by know it is at least 
superseded by the Raspberry Pi 4, because it can play h265 video.

Now if you are bored with your Risco Smart Home you could just install a different image on the micro SD card and 
use it as a media player or something, but let's see if we can gain more control over it as is. 

You could use Wireshark to intercept messages between the Risco Smart Home device and the alarm system, but first
I want to try to SSH in and/or inspect the software it is running.

In this post, I will display the IP as 192.168.0.xxx. Accessing that IP in the browser shows nothing running on port 
80, but the IP is pingable.

`nmap -v -sT 192.168.0.xxx` on the IP shows:

```
PORT     STATE SERVICE
22/tcp   open  ssh
8080/tcp open  http-proxy
8443/tcp open  https-alt
```

Opening http://192.168.0.xxx:8080 in the browser it redirects to http://192.168.0.xxx:8443/static/index.html:

```
HTTP ERROR 404

Problem accessing /static/index.html. Reason:

    Not Found

Powered by Jetty://
```

Opening https://192.168.0.xxx:8443 in the browser gives the same as 8080, but with SSL. It uses a self-signed 
certificate by [openHAB](https://www.openhab.org/). This is open-source home automation software and this may be useful
if we gain access to the device!

It is possible to create an SSH connection, but it requests a password. Trying some default root passwords failed. Now 
we know the certificate is from openHAB, maybe the CuBox is running openHAB? The default 
credentials `openhabian/openhabian` do not work.

It may be possible to inspect the micro SD to get more information. When disconnecting the gateway from power/utp 
the alarm does not go off (good!), and the micro SD can be inspected on a different machine:

The micro sd has several partitions: boot, postgre, rootfs, and scratch.

*rootfs:* there is a `/home` dir, but it is empty.
there is a `/linuxrc` dir that seems to point at `bin/busybox`. This seems to be a [BusyBox](https://www.busybox.net/) installation.

*scratch:* contains some ssh certificates. Copied to local disk.

After reconnecting the gateway to power and UTP the message "Communication with the Gateway failed." is shown in Risco cloud.
After a couple of minutes it works fine. However, the button controller that was paired (that did not work) is not 
showing up anymore. The Fibaro plug does show up and still works as expected.

It is not possible to login with default BusyBox credentials, so after disconnecting again, taking a closer look at the
volume *scratch*: it contains a file `@ssh/sshd_config` with a line `PermitRootLogin yes`.

So assuming this is the SSH config that is used runtime, we need to somehow find the root password, and then we can SSH with `ssh root@192.168.0.xxx`

Following this [suggestion](https://superuser.com/questions/1135128/what-is-default-username-and-passoword-for-busyboxs-ftpd):

> see the /etc/shadow or /etc/passwd (if the /etc/shadow not exist) with texteditor

I found that, indeed, `/etc/shadow` contains (values are fake):

`root:$1$foo$bar:10933:0:99999:7:::`

So there is in fact a root entry with a hashed password visible.
One option would be to update the hash string with a hash string of a password that we already know, a method I used 
years ago when adding users for a deprecated application by directly inserting lines into a database table. However, 
I have no idea what effect this would have on an OS, so I would prefer to refrain from modifying the filesystem at this 
point. Additionally, assuming that the provided SD card image always uses the same root password, it would be valuable 
to know the password to be able to log into other devices.

Another option would be to try to retrieve the password from the root entry in `/etc/shadow`. More information about 
why passwords are stored in `/etc/shadow` instead of `/etc/passwd` [here](https://www.slashroot.in/how-are-passwords-stored-linux-understanding-hashing-shadow-utils).

From this article I also learned how to read the shadow file: the password entry ($1$foo$bar) is in fact three 
properties separated by $. The $1 indicates MD5 hashing was used, which is notoriously easy to crack. The second 
part ("foo") is the salt and the third part ("bar") is the hash from the password + salt.

This article also shows that using the hash calculated from the salt and the password with openssl. 
This is great, because know we can write a small script to try out many passwords without trying to login to SSH and 
being kicked out for too many failed responses. The command looks like this, with `-1` indicating md5, `foo` as the 
salt and `secret` the actual password.

```openssl passwd -1 -salt foo secret # output: $1$foo$ygQElgzdVoe51UiGBN5TV/```

It is easy to do this in a bash script, but of course there already exists some open source tool: [John the Ripper](https://www.openwall.com/john/) 
([info on usage](https://linuxconfig.org/password-cracking-with-john-the-ripper-on-linux))

* First run `sudo unshadow rootfs/etc/passwd rootfs/etc/shadow > mypasswd.txt`
where `unshadow` is a util from `john`.
* Now remove all the entries from mypasswd.txt except the root user.
* Now run `john mypasswd.txt --fork=4`. 

The `fork` flag enables multi threading, in this case on 4 threads. While the command is running, I see that 4 out of 8 cores 
have a 100% load. After approximately 7 hours a password is found. Please note, that the other threads keep running, but a nice overview
is giving of how long the processes have been running and at what passwords they are trying.

Logging in to SSH as root works! (So it was indeed the correct `sshd_config`).
A prompt is shown with only "#". Running `df -h` gives:

```
Filesystem                Size      Used Available Use% Mounted on
/dev/root                 2.8M      2.3M    444.0K  84% /mnt/initrd
devtmpfs                239.2M         0    239.2M   0% /dev
/dev/disk/by-label/rootfs
                          1.0G    284.2M    544.7M  34% /
tmpfs                   249.4M      4.0K    249.4M   0% /dev/shm
tmpfs                   249.4M      9.1M    240.2M   4% /tmp
tmpfs                   249.4M    120.0K    249.2M   0% /run
/dev/mmcblk0p1           63.0M      5.9M     57.1M   9% /boot
/dev/mmcblk0p3            1.0G     93.7M    828.9M  10% /var/lib/pgsql
/dev/mmcblk0p4            1.0G     23.7M    898.7M   3% /var/spool
/dev/mmcblk0p4            1.0G     23.7M    898.7M   3% /var/log
/dev/mmcblk0p4            1.0G     23.7M    898.7M   3% /etc/ssl/private
/dev/mmcblk0p4            1.0G     23.7M    898.7M   3% /etc/ssh
/dev/mmcblk0p4            1.0G     23.7M    898.7M   3% /etc/nextgen
/dev/mmcblk0p4            1.0G     23.7M    898.7M   3% /home
```

`cat /var/log/messages` works and gives a lot of information, e.g. a daemon is running on user "nextgen" called Risco Service Manager.

It was a fun exercise to try to get into a device you own, but don't have remote access too. Next steps could be to try 
to install extra services on the device that could interact with the Risco Service Manager, or to intercept messages to 
or from the Risco Service Manager.

*Published with permission from Risco*
