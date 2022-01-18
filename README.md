# WordPress plugin for Majority Judgment


This serves as a plugin for WordPress.

So far, it has one unique feature: displaying hard-coded results.
It is built for the citizen primary in France, called [Primaire Populaire](https://primairepopulaire.fr/).

If you need additional features, please contact us using our [website contact form](https://mieuxvoter.fr/) and explain us how we can fit your need!

You can download released files as a ZIP file, and upload it in your WordPress admin panel.
Otherwise, you can also follow below instructions to install the project from sources.


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

Now, you can activate the plugin from the WordPress admin panel.

## Ballot results

To display the widget on a page, you need to add [a shortcode](https://wordpress.com/support/shortcodes/) on this page.

Assuming you are using the visual editor of WordPress, you can add such shortcode by adding a new block. A PLUS sign should appear on the top right corner of this block. Select a shortcode under the WIDGETS modules.

Finally, type `[mj-result name="My Candidate Name" rank=1 notes_by_grades=VeryGood=5&Good=3 ]` there. You can also use default grade names and only provide the list of nodes, ordered from worst to best grade: `[mj-result name="My Candidate Name" rank=1 notes="5;7;4;2" ]` 
