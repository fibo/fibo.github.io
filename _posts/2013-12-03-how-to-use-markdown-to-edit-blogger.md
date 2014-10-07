---
title: How to use Markdown to edit Blogger posts
tags:
  - Blogger
  - Markdown
description: >
    Use Markdown to edit a Blogger post.
---

Everything is possible thanks to [Stackedit][1] that is [the definitive Markdown editor][2]!

Well, right now, that is exactly the method I'm using to edit this post.

So this post contains information about how to edit other posts, so it is **meta**, and in particular itself, so it is **auto**.

Ergo this is an **auto meta post** ... mmh

## Basic structure

An empty article looks like this

```markdown
---
title: Title
tags:
  - Tag
---

Short description

<!--more-->

[TOC]

Content

```

## Insert a YAML front matter

Add YAML at the beginning of the article, something like this

```yaml
---
title: How to use Markdown to edit Blogger posts
tags:
  - Blogger
  - Markdown
---
```

### About tags

Insert **at least one entry** in the *tags* array. It will be used by Blogspot to label the article.
I consider the first entry as a *cathegory*, choose the right one and be consistent.

### Insert a jump break

First of all, I add a first introduction an then a *jump break* with this code

```html
<!--more-->
```

### Insert a table of contents

It is really easy, just add `[TOC]` and [Stackedit][3] will generate a table of contents.

I use to add it just after the jump break. A great benefit is that every section will gain an internal link, that is very useful if you want to point an anchor to a specific section of your article.

## Add an image

I like to add at least one image for every article, whenever it makes sense. There is an *add image* icon on menu bar that let you select images from an url or from Picasa where I have an album containing the images of my blog.

## Synchronization

<span class="label label-info">OPTIONAL</span>

This is not necessary, but I think it is useful to backup your articles in Markdown format.

### Export to Dropbox

You can start using [Dropbox][4], in order to be able to import an article from any computer. It will be synced every few minutes.

### Export to Google Drive

Also Google Drive is an available choice. I use both and they work great!
It is worth to keep track of the *fileId*, I use to annotate it in the YAML front matter. This is useful to avoid duplicated documents: it is the same idea I apply to the *postId*, see [below](#dont-miss-the-postid).


<span class="alert alert-info">You can copy the <em>fileId</em> from the <em>Manage synchronization</em> menu entry.</span>



Another useful tip is to store all the articles in the same folder. Just navigate to your target folfder and get the *folderId* from the Google Drive url that has the following form

```
https://drive.google.com/#folders/<YOUR_FOLDER_ID >
```

The *folderId* and *fileId* are useful information to use on the *Export to Google Drive* modal dialog: click on *Options...* to see the related input fields.

## Publication

### Publish on Blogger

Go to the top left button menu, in the *Publish on...* section

![Publish on Blogger][6]


### Don't miss the *postId*

After publication, the article get assigned a *postId* so you will be able to use the *Update document publication* button.

![Update document publication][7]

If you are using synchronization feature, it is worth to annotate the *postId* in the YAML.

You can copy the *postId* entering the *Manage publication* menu section, so YAML will looking something like this.

    ---
    title: How to use Markdown to edit Blogger posts
    tags:
      - Blogger
      - Markdown
    postId: 1766129362942319202
    ---

## See also

[Blogger style tips](http://www.g14n.info/2014/01/blogger-style-tips.html)


  [1]: https://stackedit.io/
  [2]: http://www.g14n.info/2013/10/the-definitive-markdown-editor.html
  [3]: https://stackedit.io/
  [4]: https://www.dropbox.com
  [6]: https://lh6.googleusercontent.com/-ggHYwDvHR-U/UmVtLYafvRI/AAAAAAAAA5M/NmOKzndTpr8/s0/%255BUNSET%255D "Publish on Blogger"
  [7]: https://lh6.googleusercontent.com/HMa8DjTjDXl57RbqhO61KdTpseKDylk5i2vw5fiU7h4=s0 "Update document publication"

