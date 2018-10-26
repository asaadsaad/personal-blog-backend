#README FILE FOR BLOG BACKEND

##ENTRY SCHEMA :
	1. TITLE -> Specify the title of the post ---> **STRING**
	2. AUTHOR -> Specify the author of the post ---> **STRING**
	3. DATE -> Specify the date on which the post is published ---> **ARRAY OF STRINGS**
		1. FORMAT -> Date is posted as three number array, parsed to specify english (Sunday 10th, October, 2018)
	4. TIME -> Specify the time when the post is published ---> **ARRAY OF STRINGS**
		1. FORMAT -> Time is posted as a three number array with hour, minute, ante/post meridiem (10 : 08 PM)
	5. TAGS -> Specify tags for the post ---> **ARRAY OF STRINGS**
		1. FORMAT -> Tags are posted as an x number array of strings
	6. TYPE -> Specify type of post (blog, project, tutorial) ---> **NUMBER**
		1. FORMAT TYPE A -> 1 = blog, 2 = project, 3 = tutorial
		2. FORMAT TYPE B -> 'blog', 'project', 'tutorial' ---> NOT YET IMPLEMENTED
	7. DATA -> Specify the preview and body data ---> **OBJECT OF STRINGS**
		1. FORMAT -> Data is posted as an object containing preview(Preview of post) and body(Body of post) properties.
	8. ARCHIVED STATUS -> Specify post archived status ---> **BOOLEAN**
		1. FORMAT -> Status is true (Post is inactive) or false (Post is active)


##ROUTE CHECKLIST :

	###POST REQUESTS :

		1. CREATE -> Create new entry, either blog, project, tutorial
		2. CREATE_TUTORIAL_FIELD -> Create new tutorial category
		
	###PUT REQUESTS :
		
		1. UPDATE_ID -> Update an entry by id
		2. UPDATE_TITLE -> Update an entry by title
		3. UPDATE_TUTORIAL_FIELD -> Update tutorial category
		4. UPDATE_AUTHOR -> Update info about an author
		5. 
