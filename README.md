VALUE CALCULATOR	
====================

Overview	
---------------------
This is a single page app that estimates the future value of money. The values are only estimates and are displayed to encourage the user to think about their spending habits in a more, fiscally responsible way.


API
---------------------

This version currently uses four endpoints.


### Create/Post
The user enters an item they recently purchased and the price they paid for it. They click submit and the item is added to a list with the amount of money they would have in the future if they hadn't purchased the item.

They can also save the list and return to it later.


### Read/Get
The user can enter the name of saved list and retrieve it for editing.

### Update/Put
The user can remove entire lines and add new items to the list.

### Delete
The user can remove the entire list by clicking the delete button.





IMAGES



Image syntax is very much like link syntax.

Inline (titles are optional):

![alt text](/joshkuhar/app/images/1.jpg "Home")
Reference-style:

![alt text][id]

[id]: /path/to/img.jpg "Title"
Both of the above examples produce the same output:

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

<img src="/path/to/img.jpg" alt="alt text" title="Title" />
LISTS

Unordered (bulleted) lists use asterisks, pluses, and hyphens (*, +, and -) as list markers. These three markers are interchangable; this:

*   Candy.
*   Gum.
*   Booze.
this:

+   Candy.
+   Gum.
+   Booze.
and this:

-   Candy.
-   Gum.
-   Booze.
all produce the same output:

<ul>
<li>Candy.</li>
<li>Gum.</li>
<li>Booze.</li>
</ul>
Ordered (numbered) lists use regular numbers, followed by periods, as list markers:

1.  Red
2.  Green
3.  Blue
Output:

<ol>
<li>Red</li>
<li>Green</li>
<li>Blue</li>
</ol>
If you put blank lines between items, you’ll get <p> tags for the list item text. You can create multi-paragraph list items by indenting the paragraphs by 4 spaces or 1 tab:

*   A list item.

    With multiple paragraphs.

*   Another item in the list.
Output:

<ul>
<li><p>A list item.</p>
<p>With multiple paragraphs.</p></li>
<li><p>Another item in the list.</p></li>
</ul>