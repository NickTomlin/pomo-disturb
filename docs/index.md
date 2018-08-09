A OSX tray application that harnesses the power of the "Do not disturb" to create a distraction free pomodoro flow.

Releases
---

<article>
  <h3><code>{{ site.github.latest_release.tag_name}}</code></h3>
  <p>Downloads</p>
  <ul>
    {% for asset in site.github.latest_release.assets %}
      <li><a href="{{asset.browser_download_url}}">{{asset.name}}</a></li>
    {% endfor %}
  </ul>
</article>

Bugs?
---

[check the issue queue](https://github.com/NickTomlin/pomo-disturb/issues) to see if someone has already run into your problem. If they have not, [open a new issue](https://github.com/NickTomlin/pomo-disturb/issues/new).
