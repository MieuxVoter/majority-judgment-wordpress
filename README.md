# WordPress plugin for Majority Judgment


This serves as a plugin for WordPress.

So far, it has one unique feature: displaying hard-coded results.
It is built for the citizen primary in France, called [Primaire Populaire](https://primairepopulaire.fr/).

If you need additional features, please contact us using our [website contact form](https://mieuxvoter.fr/) and explain us how we can fit your need!

We do not provide yet releases with built static files. You need to follow the guide to install the project from sources.


## Install from sources

You need to put this repository in your WordPress project at the `wp-content/plugins` location under the name `majority-judgment`:

```
# cd /var/www/html/wordpress/wp-content/plugins/
# git clone https://github.com/MieuxVoter/mv-wordpress/ majority-judgment
```
 
Then, you can update the right permission files by editing the `.htaccess` at the root of your WordPress installation `/var/www/html/wordpress/.htaccess`:



```
<IfModule mod_rewrite.c>
RewriteRule ^wp-content/plugins/majority-judgment/widget/(build|public)/(.*) - [L]
RewriteRule ^wp-content/plugins/majority-judgment/widget/* totally-bogus-erw.php [L]
</IfModule>

# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>

# END WordPress

```

It is time to compile static files:

```
# cd /var/www/html/wordpress/wp-content/plugins/majority-judgment/widget
# npm install
# npm run build
``` 

Finally, you can activate the plugin from the WordPress admin panel.


## Setting the results of the election

So far, we only provide a static modification of the election results.
You need to modify the file `widget/src/resultats.json`. Then, you will need to re-compile the static files as described above.

