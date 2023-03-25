---
title: My workflow
tags:
  - Management
description: >
     Principles and policies I use to organize my tasks. It also includes my own way to handle a kanban board which uses an interesting approach, the metadata.
---

<div class="paper warning">
If you are a <em>SCRUM master</em> or have some knowledge about <em>Project Management</em> you may found this article <b>naive</b>.
It is just my personal approach to this topic. Anyway, any feedback is welcome.
</div>

## Principles

Let's start with some *principles* I came up with.

### Simplicity

A quote from [Leonardo](https://en.wikipedia.org/wiki/Leonardo_da_Vinci):

> Simplicity is the ultimate sophistication.

### Self improvement

> A set of *management policies* is successful if it evolves itself effectively.

### Proximity

> Policies definitions should be placed into the system they are describing.

In software development, few years ago it was used to put tests in a *tests/* folder. Recently the best practice is to place tests near the related code. For instance, if code is located in file *Foo.js*, then tests are placed in file *Foo_test.js*. This has several advantages, in particular it makes easier to access test code.

This concept is sometimes also named *co-location*.

I copied this idea and applied to *Project Management*: defining policies about a board using cards, makes it easier to read and update them.

It happened so many times that I start working on a project, there is some documentation but many of the links are broken.

<div class="paper warning">Usually the <em>Backlog</em> (see below) is not a board column. Some SCRUM masters even may hide the backlog to developers and make it accessible only to the <em>Product owner</em>. This could have some pros but I think that the <em>Proximity</em> principle helps a lot. I have seen many projects with a huge and outdated backlog, full of duplicates.</div>

## Kanban board

Kanban is a method for optimizing the flow of business value through a process that uses a visual, work-in-progress limited & pull system.

Kanban allows the Team working on that workflow to reach a sustainable pace that it could be guarantee indefinitely.

You can use any tool that implement the *Getting things Done* method board. For example Jyra, GitHub projects or Trello.

See [this is an example on Trello](https://trello.com/b/DuYFIYag): it implements the board described below.

### Metadata column

Following the principles above, my idea is to create a *Metadata* column that contains all the information needed to manage the board.

Metadata should contain at least one card for each of these topics:

- cards
- columns
- labels

Follows an example of cards you can start with.

<div class="paper">
  <h2>START HERE</h2>

  <p>This is the first <em>card</em> of a <em>board</em>.</p>

  <p>A board is a set of columns. A <em>column</em> is a stack of cards. A card contains information.</p>

  <p>The cards below contain information about this board and the process to manage it.</p>
</div>

<div class="paper">
  <h2>Cards</h2>

  <p>A card has a <em>title</em>and a <em>description</em>.</p>

  <p>A card can have one or more <em>labels</em>to categorize it.</p>

  <p>A card can contain a <em>story</em>.</p>

  <p>A story is a short, simple description of a feature.</p>

  <p>Card content can be written with markdown.</p>
</div>

<div class="paper">
  <h2>Columns</h2>

  <p>Read columns from right to left, from top to bottom.</p>

  <p>Card vertical order matters: it is an information about the card.</p>

  <h3>List of columns</h3>

  <ol>
    <li><b>Metadata</b>: information about policies and guidelines of this board. Cards in this column can be moved only vertically. Cards in other columns can be moved vertically and from left to right.</li>

    <li><b>Backlog</b>: stories are created and refined here. The more it is refined the more it is moved on top.</li>

    <li><b>To do</b>: contains stories ready to be processed. Stories with higher priority are on top.</li>

    <li><b>In progress</b>: stories that are currently developed.</li>

    <li><b>Done</b>: features that are deployed to users. To be observed and measured. Latest releases are on top.</li>
  </ol>
</div>

<div class="paper">
  <h2>Labels</h2>

  <p>This special card has all labels attached.</p>

  <h3>List of labels</h3>

  <ul>
    <li><b>Needs refinement</b>: the card requires more details or needs to be subdivided into smaller cards. This label may be assigned while the story is in progress if something unexpected happens.</li>

    <li><b>Bug</b>: describes a mistake or problem to be solved. Usually they have a higher priority.</li>

    <li><b>Nice to have</b>: a story that provides value but it is not critical. Usually they have a higher priority.</li>
  </ul>
</div>

### Variants

Card content in the *Metadata* column could be changed or updated.

There could be a different set of columns, according to the development stages. For example there could be a *Ready to test* and an *In production* column rather than a single *Done* column.

It is also used to set a limit to the number of cards in a column. For example you may use this definition of the *In progress* column.

<ul>
  <li><b>In progress</b>: It contains a limited number of stories, according to capacity. This number is called <abbr title="Work in Progress">Wip</abbr>limit.</li>
</ul>

There could be additional labels, for example:

* __Needs refinement__: the card requires more details or needs to be subdivided into smaller cards. This label may be assigned while the story is in progress if something unexpected happens.

There could be also a different set of labels if the team agrees on that, but I would recommend to keep *Bug* and *Nice to have* labels.

There could be a different set of columns.

There could be other cards in the *Metadata* column, for example:

<div class="paper">
  <h2>Epics</h2>

  <p>An <em>epic</em>i s a card with a <em>check-list</em>. Every item of the list references a card.</p>

  <h3>Epic life-cycle</h3>

  <ol>
    <li>Add an item for every task to be done.</li>

    <li>Do not move the epic to the <em>In progress</em> column.</li>

    <li>Create a card for every item in the check-list.</li>

    <li>Replace the item text with a link to the card: the card title will be displayed.</li>

    <li>Once the related story is done, flag the related check-list item.</li>

    <li>If all items in the check-list are done, move the epic to done.</li>
  </ol>
</div>

I am a big fan of Markdown, and also was humbled to meet in person one of its creators: <a href="http://ingy.net">Ingy döt Net</a>. But many people do not know Markdown. You may want a add at the bottom of *Metadata* column a card like this:

<div class="paper"><h1>Markdown example</h1>
<pre class="code">
# Card title

This is a paragraph.

## Section title

This is __bold__. This is *italic*.

- list element 1

- list element 2

- list element 3
</pre>
</div>
