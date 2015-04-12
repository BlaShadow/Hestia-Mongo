Hestia-Mongo
============

Mongo web admin interface


Install
------
1. Install virtualenv

2. Create a virtual enviroment

    ``` 
    virtualenv hestiaMongo 
    ```
    
3. Activate your enviroment
   ``` 
    cd hestiaMongo 
    source bin/activate
    ```
4. Download the project 
    ``` 
    git clone http://irl_project source
    ```
5. Install dependency 
    ``` 
    cd source 
    pip install -r requeriments
    ```

6. Run gulp (configure statics files)
    ``` 
    npm install
    npm install -g gulp
    gulp prod
    ```



Configure
---
Open ```start_gunicorn``` and change those value to your current configuration.

#####VENDIR: 
Virtual enviroment dir


#####FLASKMAIN:
Source app 

Then ``` ./start_gunicorn ```

default user : root qwerty

    /app/conf.py


**Or you can just run python run.py and have fun.**

*Some Screenshots*
---------
![](/screenshots/Hestia___Dashboard 3.png?raw=true)
![](/screenshots/Hestia___Dashboard 2.png?raw=true)
![](/screenshots/Hestia___Dashboard.png?raw=true)
![](/screenshots/Admin_Hestia.png?raw=true)



