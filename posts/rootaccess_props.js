import projectConfig from '/deno-ssg-blog/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "posts/rootaccess.md",
    'layoutPath': "posts/_layout.tsx",
    'outputPath': "posts/rootaccess.html",
    'title': "Gaining Root Access to Smart Home Gateway",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Gaining Root Access to Smart Home Gateway</h1>\n<p>cover</p>\n<p>Recently I bought a Risco Smart Home Gateway, and as I expected it is a rebranded off-the-shelf micro computer.\nWhen delivered, the HDMI and optical S/PDIF outputs and IR input hinted that it was not just a dedicated smart home\ngateway. The OS seems to be loaded from a micro SD card, comparable to e.g. a Raspberry Pi. Also, the z-wave\ncontroller is just a USB dongle and not built-in.</p>\n<p>After configuring, its network interface shows up on my router as SolidRun. A quick search finds the SolidRun CuBox-i, most\nprobably the <a href="https://developer.solid-run.com/products/cubox-i/">CuBox i2eX or CuBox i4p</a>, because it also has an eSata port.</p>\n<p>These range from $100 - $150. Not too bad, considering the Risco Smart Home Gateway is around €300. Of course, this\nincludes a z-wave adapter (around €50) and their special software. Their software is actually much less flexible\nthan e.g. <a href="https://www.domoticz.com/">Domoticz</a>, but I am sure it makes up for that in security and robustness.</p>\n<p>Solid Run has a <a href="https://developer.solid-run.com">community site</a> for developers with plenty of information.</p>\n<p>The CuBox is an ARM micro computer with an FreeScale i.MX6 SoC and that means it can run several flavors of Linux,\n<a href="https://kodi.wiki/view/SolidRun_CuBox-i">Kodi</a> and in theory and old version of <a href="http://forum.solid-run.com/android-os-on-cubox-i-and-hummingboard-f6/">Android</a>.\nAn in-depth review can be found <a href="https://www.androidauthority.com/cubox-review-587011/">here</a>.</p>\n<p>I won\'t judge the performance or review it further, but it might be worth mentioning that by know it is at least\nsuperseded by the Raspberry Pi 4, because it can play h265 video.</p>\n<p>Now if you are bored with your Risco Smart Home you could just install a different image on the micro SD card and\nuse it as a media player or something, but let\'s see if we can gain more control over it as is.</p>\n<p>You could use Wireshark to intercept messages between the Risco Smart Home device and the alarm system, but first\nI want to try to SSH in and/or inspect the software it is running.</p>\n<p>In this post, I will display the IP as <a href="http://192.168.0.xxx">192.168.0.xxx</a>. Accessing that IP in the browser shows nothing running on port\n80, but the IP is pingable.</p>\n<p><code>nmap -v -sT 192.168.0.xxx</code> on the IP shows:</p>\n<pre class="language-autoit"><code class="language-autoit">PORT     STATE SERVICE\n<span class="token number">22</span><span class="token operator">/</span>tcp   open  ssh\n<span class="token number">8080</span><span class="token operator">/</span>tcp open  http<span class="token operator">-</span>proxy\n<span class="token number">8443</span><span class="token operator">/</span>tcp open  https<span class="token operator">-</span>alt\n</code></pre>\n<p>Opening <a href="http://192.168.0.xxx:8080">http://192.168.0.xxx:8080</a> in the browser it redirects to <a href="http://192.168.0.xxx:8443/static/index.html:">http://192.168.0.xxx:8443/static/index.html:</a></p>\n<pre class="language-autoit"><code class="language-autoit">HTTP ERROR <span class="token number">404</span>\n\nProblem accessing <span class="token operator">/</span><span class="token keyword">static</span><span class="token operator">/</span>index<span class="token punctuation">.</span>html<span class="token punctuation">.</span> Reason<span class="token punctuation">:</span>\n\n    <span class="token operator">Not</span> Found\n\nPowered by Jetty<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>\n</code></pre>\n<p>Opening <a href="https://192.168.0.xxx:8443">https://192.168.0.xxx:8443</a> in the browser gives the same as 8080, but with SSL. It uses a self-signed\ncertificate by <a href="https://www.openhab.org/">openHAB</a>. This is open-source home automation software and this may be useful\nif we gain access to the device!</p>\n<p>It is possible to create an SSH connection, but it requests a password. Trying some default root passwords failed. Now\nwe know the certificate is from openHAB, maybe the CuBox is running openHAB? The default\ncredentials <code>openhabian/openhabian</code> do not work.</p>\n<p>It may be possible to inspect the micro SD to get more information. When disconnecting the gateway from power/utp\nthe alarm does not go off (good!), and the micro SD can be inspected on a different machine:</p>\n<p>The micro sd has several partitions: boot, postgre, rootfs, and scratch.</p>\n<p><em>rootfs:</em> there is a <code>/home</code> dir, but it is empty.\nthere is a <code>/linuxrc</code> dir that seems to point at <code>bin/busybox</code>. This seems to be a <a href="https://www.busybox.net/">BusyBox</a> installation.</p>\n<p><em>scratch:</em> contains some ssh certificates. Copied to local disk.</p>\n<p>After reconnecting the gateway to power and UTP the message &quot;Communication with the Gateway failed.&quot; is shown in Risco cloud.\nAfter a couple of minutes it works fine. However, the button controller that was paired (that did not work) is not\nshowing up anymore. The Fibaro plug does show up and still works as expected.</p>\n<p>It is not possible to login with default BusyBox credentials, so after disconnecting again, taking a closer look at the\nvolume <em>scratch</em>: it contains a file <code>@ssh/sshd_config</code> with a line <code>PermitRootLogin yes</code>.</p>\n<p>So assuming this is the SSH config that is used runtime, we need to somehow find the root password, and then we can SSH with <code>ssh root@192.168.0.xxx</code></p>\n<p>Following this <a href="https://superuser.com/questions/1135128/what-is-default-username-and-passoword-for-busyboxs-ftpd">suggestion</a>:</p>\n<blockquote>\n<p>see the /etc/shadow or /etc/passwd (if the /etc/shadow not exist) with texteditor</p>\n</blockquote>\n<p>I found that, indeed, <code>/etc/shadow</code> contains (values are fake):</p>\n<p><code>root:$1$foo$bar:10933:0:99999:7:::</code></p>\n<p>So there is in fact a root entry with a hashed password visible.\nOne option would be to update the hash string with a hash string of a password that we already know, a method I used\nyears ago when adding users for a deprecated application by directly inserting lines into a database table. However,\nI have no idea what effect this would have on an OS, so I would prefer to refrain from modifying the filesystem at this\npoint. Additionally, assuming that the provided SD card image always uses the same root password, it would be valuable\nto know the password to be able to log into other devices.</p>\n<p>Another option would be to try to retrieve the password from the root entry in <code>/etc/shadow</code>. More information about\nwhy passwords are stored in <code>/etc/shadow</code> instead of <code>/etc/passwd</code> <a href="https://www.slashroot.in/how-are-passwords-stored-linux-understanding-hashing-shadow-utils">here</a>.</p>\n<p>From this article I also learned how to read the shadow file: the password entry (<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn></mrow><annotation encoding="application/x-tex">1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.64444em;vertical-align:0em;"></span><span class="mord">1</span></span></span></span>foo$bar) is in fact three\nproperties separated by $. The $1 indicates MD5 hashing was used, which is notoriously easy to crack. The second\npart (&quot;foo&quot;) is the salt and the third part (&quot;bar&quot;) is the hash from the password + salt.</p>\n<p>This article also shows that using the hash calculated from the salt and the password with openssl.\nThis is great, because know we can write a small script to try out many passwords without trying to login to SSH and\nbeing kicked out for too many failed responses. The command looks like this, with <code>-1</code> indicating md5, <code>foo</code> as the\nsalt and <code>secret</code> the actual password.</p>\n<p><code>openssl passwd -1 -salt foo secret # output: $1$foo$ygQElgzdVoe51UiGBN5TV/</code></p>\n<p>It is easy to do this in a bash script, but of course there already exists some open source tool: <a href="https://www.openwall.com/john/">John the Ripper</a>\n(<a href="https://linuxconfig.org/password-cracking-with-john-the-ripper-on-linux">info on usage</a>)</p>\n<ul>\n<li>First run <code>sudo unshadow rootfs/etc/passwd rootfs/etc/shadow &gt; mypasswd.txt</code>\nwhere <code>unshadow</code> is a util from <code>john</code>.</li>\n<li>Now remove all the entries from mypasswd.txt except the root user.</li>\n<li>Now run <code>john mypasswd.txt --fork=4</code>.</li>\n</ul>\n<p>The <code>fork</code> flag enables multi threading, in this case on 4 threads. While the command is running, I see that 4 out of 8 cores\nhave a 100% load. After approximately 7 hours a password is found. Please note, that the other threads keep running, but a nice overview\nis giving of how long the processes have been running and at what passwords they are trying.</p>\n<p>Logging in to SSH as root works! (So it was indeed the correct <code>sshd_config</code>).\nA prompt is shown with only &quot;#&quot;. Running <code>df -h</code> gives:</p>\n<pre class="language-autoit"><code class="language-autoit">Filesystem                Size      Used Available Use% Mounted on\n<span class="token operator">/</span>dev<span class="token operator">/</span>root                 <span class="token number">2</span><span class="token punctuation">.</span>8M      <span class="token number">2</span><span class="token punctuation">.</span>3M    <span class="token number">444</span><span class="token punctuation">.</span>0K  <span class="token number">84</span>% <span class="token operator">/</span>mnt<span class="token operator">/</span>initrd\ndevtmpfs                <span class="token number">239</span><span class="token punctuation">.</span>2M         <span class="token number">0</span>    <span class="token number">239</span><span class="token punctuation">.</span>2M   <span class="token number">0</span>% <span class="token operator">/</span>dev\n<span class="token operator">/</span>dev<span class="token operator">/</span>disk<span class="token operator">/</span>by<span class="token operator">-</span>label<span class="token operator">/</span>rootfs\n                          <span class="token number">1</span><span class="token punctuation">.</span>0G    <span class="token number">284</span><span class="token punctuation">.</span>2M    <span class="token number">544</span><span class="token punctuation">.</span>7M  <span class="token number">34</span>% <span class="token operator">/</span>\ntmpfs                   <span class="token number">249</span><span class="token punctuation">.</span>4M      <span class="token number">4</span><span class="token punctuation">.</span>0K    <span class="token number">249</span><span class="token punctuation">.</span>4M   <span class="token number">0</span>% <span class="token operator">/</span>dev<span class="token operator">/</span>shm\ntmpfs                   <span class="token number">249</span><span class="token punctuation">.</span>4M      <span class="token number">9</span><span class="token punctuation">.</span>1M    <span class="token number">240</span><span class="token punctuation">.</span>2M   <span class="token number">4</span>% <span class="token operator">/</span>tmp\ntmpfs                   <span class="token number">249</span><span class="token punctuation">.</span>4M    <span class="token number">120</span><span class="token punctuation">.</span>0K    <span class="token number">249</span><span class="token punctuation">.</span>2M   <span class="token number">0</span>% <span class="token operator">/</span>run\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p1           <span class="token number">63</span><span class="token punctuation">.</span>0M      <span class="token number">5</span><span class="token punctuation">.</span>9M     <span class="token number">57</span><span class="token punctuation">.</span>1M   <span class="token number">9</span>% <span class="token operator">/</span>boot\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p3            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">93</span><span class="token punctuation">.</span>7M    <span class="token number">828</span><span class="token punctuation">.</span>9M  <span class="token number">10</span>% <span class="token operator">/</span>var<span class="token operator">/</span>lib<span class="token operator">/</span>pgsql\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p4            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">23</span><span class="token punctuation">.</span>7M    <span class="token number">898</span><span class="token punctuation">.</span>7M   <span class="token number">3</span>% <span class="token operator">/</span>var<span class="token operator">/</span>spool\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p4            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">23</span><span class="token punctuation">.</span>7M    <span class="token number">898</span><span class="token punctuation">.</span>7M   <span class="token number">3</span>% <span class="token operator">/</span>var<span class="token operator">/</span>log\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p4            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">23</span><span class="token punctuation">.</span>7M    <span class="token number">898</span><span class="token punctuation">.</span>7M   <span class="token number">3</span>% <span class="token operator">/</span>etc<span class="token operator">/</span>ssl<span class="token operator">/</span>private\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p4            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">23</span><span class="token punctuation">.</span>7M    <span class="token number">898</span><span class="token punctuation">.</span>7M   <span class="token number">3</span>% <span class="token operator">/</span>etc<span class="token operator">/</span>ssh\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p4            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">23</span><span class="token punctuation">.</span>7M    <span class="token number">898</span><span class="token punctuation">.</span>7M   <span class="token number">3</span>% <span class="token operator">/</span>etc<span class="token operator">/</span>nextgen\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p4            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">23</span><span class="token punctuation">.</span>7M    <span class="token number">898</span><span class="token punctuation">.</span>7M   <span class="token number">3</span>% <span class="token operator">/</span>home\n</code></pre>\n<p><code>cat /var/log/messages</code> works and gives a lot of information, e.g. a daemon is running on user &quot;nextgen&quot; called Risco Service Manager.</p>\n<p>It was a fun exercise to try to get into a device you own, but don\'t have remote access too. Next steps could be to try\nto install extra services on the device that could interact with the Risco Service Manager, or to intercept messages to\nor from the Risco Service Manager.</p>\n<p><em>Published with permission from Risco</em></p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/deno-ssg-blog/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "Gaining Root Access to Smart Home Gateway"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>cover</p>\n<p>Recently I bought a Risco Smart Home Gateway, and as I expected it is a rebranded off-the-shelf micro computer.\nWhen delivered, the HDMI and optical S/PDIF outputs and IR input hinted that it was not just a dedicated smart home\ngateway. The OS seems to be loaded from a micro SD card, comparable to e.g. a Raspberry Pi. Also, the z-wave\ncontroller is just a USB dongle and not built-in.</p>\n<p>After configuring, its network interface shows up on my router as SolidRun. A quick search finds the SolidRun CuBox-i, most\nprobably the <a href="https://developer.solid-run.com/products/cubox-i/">CuBox i2eX or CuBox i4p</a>, because it also has an eSata port.</p>\n<p>These range from $100 - $150. Not too bad, considering the Risco Smart Home Gateway is around €300. Of course, this\nincludes a z-wave adapter (around €50) and their special software. Their software is actually much less flexible\nthan e.g. <a href="https://www.domoticz.com/">Domoticz</a>, but I am sure it makes up for that in security and robustness.</p>\n<p>Solid Run has a <a href="https://developer.solid-run.com">community site</a> for developers with plenty of information.</p>\n<p>The CuBox is an ARM micro computer with an FreeScale i.MX6 SoC and that means it can run several flavors of Linux,\n<a href="https://kodi.wiki/view/SolidRun_CuBox-i">Kodi</a> and in theory and old version of <a href="http://forum.solid-run.com/android-os-on-cubox-i-and-hummingboard-f6/">Android</a>.\nAn in-depth review can be found <a href="https://www.androidauthority.com/cubox-review-587011/">here</a>.</p>\n<p>I won\'t judge the performance or review it further, but it might be worth mentioning that by know it is at least\nsuperseded by the Raspberry Pi 4, because it can play h265 video.</p>\n<p>Now if you are bored with your Risco Smart Home you could just install a different image on the micro SD card and\nuse it as a media player or something, but let\'s see if we can gain more control over it as is.</p>\n<p>You could use Wireshark to intercept messages between the Risco Smart Home device and the alarm system, but first\nI want to try to SSH in and/or inspect the software it is running.</p>\n<p>In this post, I will display the IP as <a href="http://192.168.0.xxx">192.168.0.xxx</a>. Accessing that IP in the browser shows nothing running on port\n80, but the IP is pingable.</p>\n<p><code>nmap -v -sT 192.168.0.xxx</code> on the IP shows:</p>\n<pre class="language-autoit"><code class="language-autoit">PORT     STATE SERVICE\n<span class="token number">22</span><span class="token operator">/</span>tcp   open  ssh\n<span class="token number">8080</span><span class="token operator">/</span>tcp open  http<span class="token operator">-</span>proxy\n<span class="token number">8443</span><span class="token operator">/</span>tcp open  https<span class="token operator">-</span>alt\n</code></pre>\n<p>Opening <a href="http://192.168.0.xxx:8080">http://192.168.0.xxx:8080</a> in the browser it redirects to <a href="http://192.168.0.xxx:8443/static/index.html:">http://192.168.0.xxx:8443/static/index.html:</a></p>\n<pre class="language-autoit"><code class="language-autoit">HTTP ERROR <span class="token number">404</span>\n\nProblem accessing <span class="token operator">/</span><span class="token keyword">static</span><span class="token operator">/</span>index<span class="token punctuation">.</span>html<span class="token punctuation">.</span> Reason<span class="token punctuation">:</span>\n\n    <span class="token operator">Not</span> Found\n\nPowered by Jetty<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>\n</code></pre>\n<p>Opening <a href="https://192.168.0.xxx:8443">https://192.168.0.xxx:8443</a> in the browser gives the same as 8080, but with SSL. It uses a self-signed\ncertificate by <a href="https://www.openhab.org/">openHAB</a>. This is open-source home automation software and this may be useful\nif we gain access to the device!</p>\n<p>It is possible to create an SSH connection, but it requests a password. Trying some default root passwords failed. Now\nwe know the certificate is from openHAB, maybe the CuBox is running openHAB? The default\ncredentials <code>openhabian/openhabian</code> do not work.</p>\n<p>It may be possible to inspect the micro SD to get more information. When disconnecting the gateway from power/utp\nthe alarm does not go off (good!), and the micro SD can be inspected on a different machine:</p>\n<p>The micro sd has several partitions: boot, postgre, rootfs, and scratch.</p>\n<p><em>rootfs:</em> there is a <code>/home</code> dir, but it is empty.\nthere is a <code>/linuxrc</code> dir that seems to point at <code>bin/busybox</code>. This seems to be a <a href="https://www.busybox.net/">BusyBox</a> installation.</p>\n<p><em>scratch:</em> contains some ssh certificates. Copied to local disk.</p>\n<p>After reconnecting the gateway to power and UTP the message &quot;Communication with the Gateway failed.&quot; is shown in Risco cloud.\nAfter a couple of minutes it works fine. However, the button controller that was paired (that did not work) is not\nshowing up anymore. The Fibaro plug does show up and still works as expected.</p>\n<p>It is not possible to login with default BusyBox credentials, so after disconnecting again, taking a closer look at the\nvolume <em>scratch</em>: it contains a file <code>@ssh/sshd_config</code> with a line <code>PermitRootLogin yes</code>.</p>\n<p>So assuming this is the SSH config that is used runtime, we need to somehow find the root password, and then we can SSH with <code>ssh root@192.168.0.xxx</code></p>\n<p>Following this <a href="https://superuser.com/questions/1135128/what-is-default-username-and-passoword-for-busyboxs-ftpd">suggestion</a>:</p>\n<blockquote>\n<p>see the /etc/shadow or /etc/passwd (if the /etc/shadow not exist) with texteditor</p>\n</blockquote>\n<p>I found that, indeed, <code>/etc/shadow</code> contains (values are fake):</p>\n<p><code>root:$1$foo$bar:10933:0:99999:7:::</code></p>\n<p>So there is in fact a root entry with a hashed password visible.\nOne option would be to update the hash string with a hash string of a password that we already know, a method I used\nyears ago when adding users for a deprecated application by directly inserting lines into a database table. However,\nI have no idea what effect this would have on an OS, so I would prefer to refrain from modifying the filesystem at this\npoint. Additionally, assuming that the provided SD card image always uses the same root password, it would be valuable\nto know the password to be able to log into other devices.</p>\n<p>Another option would be to try to retrieve the password from the root entry in <code>/etc/shadow</code>. More information about\nwhy passwords are stored in <code>/etc/shadow</code> instead of <code>/etc/passwd</code> <a href="https://www.slashroot.in/how-are-passwords-stored-linux-understanding-hashing-shadow-utils">here</a>.</p>\n<p>From this article I also learned how to read the shadow file: the password entry (<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn></mrow><annotation encoding="application/x-tex">1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.64444em;vertical-align:0em;"></span><span class="mord">1</span></span></span></span>foo$bar) is in fact three\nproperties separated by $. The $1 indicates MD5 hashing was used, which is notoriously easy to crack. The second\npart (&quot;foo&quot;) is the salt and the third part (&quot;bar&quot;) is the hash from the password + salt.</p>\n<p>This article also shows that using the hash calculated from the salt and the password with openssl.\nThis is great, because know we can write a small script to try out many passwords without trying to login to SSH and\nbeing kicked out for too many failed responses. The command looks like this, with <code>-1</code> indicating md5, <code>foo</code> as the\nsalt and <code>secret</code> the actual password.</p>\n<p><code>openssl passwd -1 -salt foo secret # output: $1$foo$ygQElgzdVoe51UiGBN5TV/</code></p>\n<p>It is easy to do this in a bash script, but of course there already exists some open source tool: <a href="https://www.openwall.com/john/">John the Ripper</a>\n(<a href="https://linuxconfig.org/password-cracking-with-john-the-ripper-on-linux">info on usage</a>)</p>\n<ul>\n<li>First run <code>sudo unshadow rootfs/etc/passwd rootfs/etc/shadow &gt; mypasswd.txt</code>\nwhere <code>unshadow</code> is a util from <code>john</code>.</li>\n<li>Now remove all the entries from mypasswd.txt except the root user.</li>\n<li>Now run <code>john mypasswd.txt --fork=4</code>.</li>\n</ul>\n<p>The <code>fork</code> flag enables multi threading, in this case on 4 threads. While the command is running, I see that 4 out of 8 cores\nhave a 100% load. After approximately 7 hours a password is found. Please note, that the other threads keep running, but a nice overview\nis giving of how long the processes have been running and at what passwords they are trying.</p>\n<p>Logging in to SSH as root works! (So it was indeed the correct <code>sshd_config</code>).\nA prompt is shown with only &quot;#&quot;. Running <code>df -h</code> gives:</p>\n<pre class="language-autoit"><code class="language-autoit">Filesystem                Size      Used Available Use% Mounted on\n<span class="token operator">/</span>dev<span class="token operator">/</span>root                 <span class="token number">2</span><span class="token punctuation">.</span>8M      <span class="token number">2</span><span class="token punctuation">.</span>3M    <span class="token number">444</span><span class="token punctuation">.</span>0K  <span class="token number">84</span>% <span class="token operator">/</span>mnt<span class="token operator">/</span>initrd\ndevtmpfs                <span class="token number">239</span><span class="token punctuation">.</span>2M         <span class="token number">0</span>    <span class="token number">239</span><span class="token punctuation">.</span>2M   <span class="token number">0</span>% <span class="token operator">/</span>dev\n<span class="token operator">/</span>dev<span class="token operator">/</span>disk<span class="token operator">/</span>by<span class="token operator">-</span>label<span class="token operator">/</span>rootfs\n                          <span class="token number">1</span><span class="token punctuation">.</span>0G    <span class="token number">284</span><span class="token punctuation">.</span>2M    <span class="token number">544</span><span class="token punctuation">.</span>7M  <span class="token number">34</span>% <span class="token operator">/</span>\ntmpfs                   <span class="token number">249</span><span class="token punctuation">.</span>4M      <span class="token number">4</span><span class="token punctuation">.</span>0K    <span class="token number">249</span><span class="token punctuation">.</span>4M   <span class="token number">0</span>% <span class="token operator">/</span>dev<span class="token operator">/</span>shm\ntmpfs                   <span class="token number">249</span><span class="token punctuation">.</span>4M      <span class="token number">9</span><span class="token punctuation">.</span>1M    <span class="token number">240</span><span class="token punctuation">.</span>2M   <span class="token number">4</span>% <span class="token operator">/</span>tmp\ntmpfs                   <span class="token number">249</span><span class="token punctuation">.</span>4M    <span class="token number">120</span><span class="token punctuation">.</span>0K    <span class="token number">249</span><span class="token punctuation">.</span>2M   <span class="token number">0</span>% <span class="token operator">/</span>run\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p1           <span class="token number">63</span><span class="token punctuation">.</span>0M      <span class="token number">5</span><span class="token punctuation">.</span>9M     <span class="token number">57</span><span class="token punctuation">.</span>1M   <span class="token number">9</span>% <span class="token operator">/</span>boot\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p3            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">93</span><span class="token punctuation">.</span>7M    <span class="token number">828</span><span class="token punctuation">.</span>9M  <span class="token number">10</span>% <span class="token operator">/</span>var<span class="token operator">/</span>lib<span class="token operator">/</span>pgsql\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p4            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">23</span><span class="token punctuation">.</span>7M    <span class="token number">898</span><span class="token punctuation">.</span>7M   <span class="token number">3</span>% <span class="token operator">/</span>var<span class="token operator">/</span>spool\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p4            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">23</span><span class="token punctuation">.</span>7M    <span class="token number">898</span><span class="token punctuation">.</span>7M   <span class="token number">3</span>% <span class="token operator">/</span>var<span class="token operator">/</span>log\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p4            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">23</span><span class="token punctuation">.</span>7M    <span class="token number">898</span><span class="token punctuation">.</span>7M   <span class="token number">3</span>% <span class="token operator">/</span>etc<span class="token operator">/</span>ssl<span class="token operator">/</span>private\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p4            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">23</span><span class="token punctuation">.</span>7M    <span class="token number">898</span><span class="token punctuation">.</span>7M   <span class="token number">3</span>% <span class="token operator">/</span>etc<span class="token operator">/</span>ssh\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p4            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">23</span><span class="token punctuation">.</span>7M    <span class="token number">898</span><span class="token punctuation">.</span>7M   <span class="token number">3</span>% <span class="token operator">/</span>etc<span class="token operator">/</span>nextgen\n<span class="token operator">/</span>dev<span class="token operator">/</span>mmcblk0p4            <span class="token number">1</span><span class="token punctuation">.</span>0G     <span class="token number">23</span><span class="token punctuation">.</span>7M    <span class="token number">898</span><span class="token punctuation">.</span>7M   <span class="token number">3</span>% <span class="token operator">/</span>home\n</code></pre>\n<p><code>cat /var/log/messages</code> works and gives a lot of information, e.g. a daemon is running on user &quot;nextgen&quot; called Risco Service Manager.</p>\n<p>It was a fun exercise to try to get into a device you own, but don\'t have remote access too. Next steps could be to try\nto install extra services on the device that could interact with the Risco Service Manager, or to intercept messages to\nor from the Risco Service Manager.</p>\n<p><em>Published with permission from Risco</em></p>'
        } }),
    'toc': null,
    'author': "mdvanes",
    'contributors': [
        "mdvanes"
    ],
    'date': "2021-03-06T14:13:20.000Z",
    'updated': null,
    'excerpt': "cover Recently I bought a Risco Smart Home Gateway, and as I expected it is a rebranded off-the-shelf micro computer. When delivered, the HDMI and optical S/PDIF outputs and IR input hinted that it was not just...",
    'cover': undefined,
    'categories': [
        "mypc"
    ],
    'tags': [
        "Code quality",
        "Code complexity"
    ],
    'blog': {
        "isPost": true,
        "posts": [
            {
                "pagePath": "posts/rootaccess.md",
                "title": "Gaining Root Access to Smart Home Gateway",
                "link": "posts/rootaccess.html",
                "date": "2021-03-06T14:13:20.000Z",
                "updated": null,
                "author": "mdvanes",
                "contributors": [
                    "mdvanes"
                ],
                "categories": [
                    "mypc"
                ],
                "tags": [
                    "Code quality",
                    "Code complexity"
                ],
                "excerpt": "cover Recently I bought a Risco Smart Home Gateway, and as I expected it is a rebranded off-the-shelf micro computer. When delivered, the HDMI and optical S/PDIF outputs and IR input hinted that it was not just..."
            },
            {
                "pagePath": "posts/myfirstpost.md",
                "title": "My First Post",
                "link": "posts/myfirstpost.html",
                "date": "2021-03-06T14:13:20.000Z",
                "updated": null,
                "author": "mdvanes",
                "contributors": [
                    "mdvanes"
                ],
                "categories": [
                    "Programming"
                ],
                "tags": [
                    "Code quality",
                    "Code complexity"
                ],
                "excerpt": "On this wonderful Pagic powered blog"
            },
            {
                "pagePath": "posts/apollo.md",
                "title": "Apollo in practice",
                "link": "posts/apollo.html",
                "date": "2021-03-06T14:13:20.000Z",
                "updated": null,
                "author": "mdvanes",
                "contributors": [
                    "mdvanes"
                ],
                "excerpt": "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------..."
            }
        ],
        "categories": [
            {
                "name": "mypc",
                "count": 1
            },
            {
                "name": "Programming",
                "count": 1
            }
        ],
        "tags": [
            {
                "name": "Code complexity",
                "count": 2
            },
            {
                "name": "Code quality",
                "count": 2
            }
        ]
    }
};
