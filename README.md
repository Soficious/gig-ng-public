# Altar.io Angular FrontEnd Exercise 0619 (Do not fork)
The candidate should write the solution using Angular framework and it's free to use any patterns, methodologies and styling language.
You will be creating 2 pages with a couple of interactive widgets. 

The exercise involves creating **2 routes**: 
- /generator/ 
-  /payments/ 

## Steps
1. **Clone** the project to your GitHub account **[DO NOT FORK]**
2. Create a branch with your name (ex: andre-pinto)
3. Develop under that branch
4. Submit a **Pull Request** on your **Repo**
5. Send us an email with your **Repo**


## Generator Page
![generator page](https://altario-public.s3-eu-west-1.amazonaws.com/generator.jpg)

The basic idea is that we have a **10x10** grid filled with characters and will use the host system clock and the grid together to generate a **2 digit code**.

| |0|1|2|3|4|5|6|7|8|9
|-|-|-|-|-|-|-|-|-|-|-|
|0|a|a|a|a|a|a|a|a|a|a|
|1|a|a|a|a|a|a|a|a|a|a|
|2|a|a|a|a|a|a|a|a|a|a|
|3|a|a|a|a|a|a|a|a|a|a|
|4|a|a|a|a|a|a|a|a|a|a|
|5|a|a|a|a|a|a|a|a|a|a|
|6|a|a|a|a|a|a|a|a|a|a|
|7|a|a|a|a|a|a|a|a|a|a|
|8|a|a|a|a|a|a|a|a|a|a|
|9|a|a|a|a|a|a|a|a|a|a|


In this page you have a **button** to start the “generator”. After clicking on this button the grid will be filled with random alphabetic characters (a-z), like so Position [0,1] will have a **“b”** and Position [8,7] will have a **“c”**.

If you also find an optional **input** field which allows the user to enter an alphabetic character (a-z) and this character will be used as a weight constant of 20% when filling the grid, like so: If a character is entered and it’s a **“z”**, means that 20% of the grid cells will be filled with **“z”** and the remaining ones with random characters.

The user is only allowed to enter a character **once every 4 seconds**, i.e. user cannot type repeatedly a random character. 

There is a display field underneath the table with the **2 digit code**.
To populate this field, the following trivial **algorithm** needs to be followed:

1.  Get the 2 digit seconds from the clock, like so: 12:40:36.
    
2.  Get the matching grid cell values for the positions [3,6] and [6,3], like so: “v” and “c”.
    
3.  Count the occurrences of “v” and “c” on the entire grid, like so: v = **7**, c = **9**.
    
4.  If the count is larger than 9, divide the count by the lowest integer possible in order to get a value lower or equal to 9. *roundup the result if decimal.
    
5.  Done! That is your code: **79**

Every 2 seconds the grid needs to be refreshed and a different code will be generated.

## Payments Page
![payments page](https://altario-public.s3-eu-west-1.amazonaws.com/payments.jpg)
In this page you will show the updated **code** on the top (don’t forget, every 2 seconds we have a new code).

There are 2 simple **form fields** to add a payment name and amount and a **button** to add to the payments list.

Every entry on the grid will have the current code assigned to it, together with a copy of the grid (yes, the 64 cells).

This payments list should be ready to be saved to an **API**.

The user should be able to **navigate** between the 2 pages whilst not losing any information i.,e., still see the payments list.


    



