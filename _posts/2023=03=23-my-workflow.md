---
title: My workflow
tags:
  - Management
description: >
     Principles and policies I use to organize my tasks. It also includes my own way to handle a kanban board which uses an interesting approach, the metadata.
---

## Principles

Let's start with some *principles* I came up with.

### Self improvement

> A set of *management policies* is successful if it evolves itself effectively.

### Proximity

> Policies definitions should be placed into the system they are describing.

## Kanban board

Kanban is a method for optimizing the flow of business value through a process that uses a visual, work-in-progress limited & pull system.

Kanban allows the Team working on that workflow to reach a sustainable pace that it could be guarantee indefinitely.

You can use any tool that implement the *Getting things Done* method board. For example Jyra, GitHub projects or Trello.

This is an example on Trello that implements the board described below: https://trello.com/b/DuYFIYag

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

    <li><b>In progress</b>: It contains a limited number of stories, according to capacity. This number is called WiP limit.</li>

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
