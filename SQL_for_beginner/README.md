SQL is one of the in-demand skills in IT industry. The most asked interview questions for beginner are as follows.

1. What is SQL?
Answer: SQL stands for Structured Query Language. It is the standard language for relational database management systems.
It is especially useful in handling organized data comprised of entities (variables) and relations between different entities of the data. 

2. What is the difference between SQL and MySQL?
Answer: SQL is a standard language for retrieving and manipulating structured databases. 
On the contrary, MySQL is a relational database management system, like SQL Server, Oracle or IBM DB2, that is used to manage SQL databases.

3. What are Tables and Fields?
Answer: A table is an organized collection of data stored in the form of rows and columns. Columns can be categorized as vertical and rows as horizontal. 
The columns in a table are called fields while the rows can be referred to as records.

4. What are Constraints in SQL?
Answer: Constraints are used to specify the rules concerning data in the table. It can be applied for single or multiple fields in an 
SQL table during creation of table or after creationg using the ALTER TABLE command. The constraints are:

NOT NULL - Restricts NULL value from being inserted into a column.
CHECK - Verifies that all values in a field satisfy a condition.
DEFAULT - Automatically assigns a default value if no value has been specified for the field.
UNIQUE - Ensures unique values to be inserted into the field.
INDEX - Indexes a field providing faster retrieval of records.
PRIMARY KEY - Uniquely identifies each record in a table.
FOREIGN KEY - Ensures referential integrity for a record in another table.

5. What is a Primary Key?
Answer: The PRIMARY KEY constraint uniquely identifies each row in a table. It must contain UNIQUE values and has an implicit NOT NULL constraint.
A table in SQL is strictly restricted to have one and only one primary key, which is comprised of single or multiple fields (columns).

CREATE TABLE Students ( 	 /* Create table with a single field as primary key */
    ID INT NOT NULL
    Name VARCHAR(255)
    PRIMARY KEY (ID)
);


6. What is a Foreign Key?
Answer: A FOREIGN KEY comprises of single or collection of fields in a table that essentially refer to the PRIMARY KEY in another table. 
Foreign key constraint ensures referential integrity in the relation between two tables.The table with the foreign key constraint is labelled 
as the child table, and the table containing the candidate key is labelled as the referenced or parent table.

7. What is the difference between Clustered and Non-clustered index?
Answer: As explained above, the differences can be broken down into three small factors -

Clustered index modifies the way records are stored in a database based on the indexed column. Non-clustered index creates a separate entity within 
the table which references the original table.
Clustered index is used for easy and speedy retrieval of data from the database, whereas, fetching records from the non-clustered index is relatively slower.
In SQL, a table can have a single clustered index whereas it can have multiple non-clustered indexes.