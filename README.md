# UDEMY: Build a Full-Stack Web App

![Udemy Logo](https://www.langoly.com/wp-content/uploads/2022/09/udemy-logo.png)

![JAVASCRIPT](https://img.shields.io/badge/javascript-purple?style=plastic)
![HTML](https://img.shields.io/badge/html-yellow?style=plastic)
![REACT](https://img.shields.io/badge/react-red?style=plastic)
![CSS](https://img.shields.io/badge/css-blue?style=plastic)

## Supabase: Storing App Data

Currently the project is static. It cannot create any new data and the current data is not being loaded from anywhere.

### What is Supabase

A service that allows easy creation of a back-end with a database.

A back-end application uses languages such as **nodejs** or **php** to be created and connected to a database.

Supabase automatically creates a **database** and **API** to request and receive data from the server where the Supabase database is hosted.

**Application Programming Interface** (API) is a program that receives requests for data and then sends that data back as JSON.

### Exploring the Supabase Project

On the dashboard you will see a **_Table Editor_**, **_Authentication_** (i.e. Add Users to Database), **_API Documentation_**, etc.

### Creating a Table

This will store all application data.

1. Click on **Table Editor** on the dashboard.
2. Click on **Create a new table**.
3. Fill in the **Name** field.
4. Make sure **Enable RLS** is checked and **Enable Realtime** is un-checked.
5. Create Columns (schema), which can also be done by importing a spreadsheet:

- Each piece of data in the schema will have a unique **id** which will serve as a **primary key** and this will be auto generated.
- There will also be a `created_at` auto generated which is the current time and date that a new piece of data is created.
- Next, we will add another column and name it **_text_**, and select **text** or **varchar** as the **type**.
- Next, we will add another column and name it **_source_** with the type of **text**.
- Next, we will add another column and name it **_category_** with the type of **text**.
- Another column with the name **_votes_interesting_** with the type of **int4**, and create a **Default Value** of **_0_**.
- Another column with the name **_votes_mindblowing_** with the type of **int4**, and create a **Default Value** of **_0_**.
- Another column with the name **_votes_false_** with the type of **int4**, and create a **Default Value** of **_0_**.
- Click **Save**.

### Inserting Data into Table

1. Click **Insert Row**.
2. Make sure thr headings in the spreadsheet match and upload CSV.
3. Click **Import data**.
4. You can update/edit any of the columns of a row by clicking right in the GUI and hitting save.

### Connecting to the Database (API)

1. Click **API Docs** in the dashboard.
2. Click the name of your table (i.e. facts).
3. You will now see how to do things using a JavaScript SDK, but we will click on **bash** for the time being.
4. Click on **Project API key** and select **anon (public)**. This will reveal an API key for each column which is needed to create a request to the database.
5. Copy the data from ID and paste it in the terminal.
6. Delete `?select=id` from the URL pasted in the terminal and you are left with your URL to your database (db).
7. Press enter in the terminal and you will most likely get an output of an empty array.

### Row Level Security Policies

1. Click on the **Authentication** section in the Supabase dashboard.
2. Click on **Policies**.
3. Click on **Create policy**.
4. Click on **Enable read access for all users** to paste in that template.
5. Make sure **SELECT** is selected (reading data).
6. Click **Save policy**.
7. This allows anyone that has the API to read the data.
8. Now when we paste the curl command from before in the terminal the output array will have the data in it.

We now have to create two more policies so that users can _upload_ data as well as _modify_ data. IRL you would only give _edit_ access to users who are authenticated and all users to _read_ data.

1. Click on **Create policy** again.
2. Click on **Enable read access for all users**.
3. Change **Policy Command** from **SELECT** to **INSERT**.
4. Rename **Policy Name** to **_Enable insert access for all users_**.
5. Write `true` within `with check ();`.
6. Click **Save Policy**.

Now for modifying data.

1. Click on **Create policy** again.
2. Click on **Enable read access for all users**.
3. Change **Policy Command** from **SELECT** to **UPDATE**.
4. Rename **Policy Name** to **_Enable update access for all users_**.
5. Write `true` within `with check ();`.
6. Click **Save Policy**.
