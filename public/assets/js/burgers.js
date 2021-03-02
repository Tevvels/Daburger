
//added an event listener to trigger once the DOM Content it loaded

document.addEventListener('DOMContentLoaded',(event)=>{
    if(event){
        console.log('DOM loaded');
    }
    // we then get all elements that have the class of "has-eaten"
    const getDevoured = document.querySelectorAll('.has-eaten');
    //for those elements
    if(getDevoured) {
        // add an event listener for each one
        getDevoured.forEach((btn)=>{
            btn.addEventListener('click',(e)=>{
                // that will get the attributes of the of the element
                //this case the id and a boolean representing that the item has been "devoured"
                const id = e.target.getAttribute('data-id');
                const gotDevoured = e.target.getAttribute('data-devoured')
                // console.log(id,gotDevoured)
                // true or false is represented as 1/true 0/false,
                // we will just convert the data type to a number then add one to make it "true",
                 let parsenumber = parseInt(gotDevoured) + 1;
                 //maked an objecte that contains parsenumber
                const devouredState = {
                    devoured: parsenumber,
                };

                console.log(devouredState);

                // using fetch to grab the params of a specific saved data type. 

                fetch(`/api/burgers/${id}`,{
                    //put is used for updating data
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',

                    },
                    //by placing what we changed into the body
                    body: JSON.stringify(devouredState),

                    // we then responsed
                }).then((response)=>{
                    //  as long as the response is meets the conditions
                    if(response.ok) {
                        // we will console log what happened 
                        console.log(`changed devoured to ${gotDevoured}`);
                        // and reload the page 
                        location.reload('/');

                    } else {
                        alert('something went wrong');
                    }
                });
            })
        })
    }

    // we get the element create burger 
    // which is a form 
    const getBurgerBtn  = document.getElementById('create-burger');
    // we will take the input from the element with an id of bgrs 
    // using trim to clean up the uneeded spaces
    burger_names = document.getElementById("bgrs").value.trim(),
    // will contain the result if an element with the id of devoured it true or false
    // its part of the data change from earlier
    dvs = document.getElementById('devoured').checked
    // console.log(getBurgerBtn,burger_names,dvs)

    if(getBurgerBtn)  {
        //adds an eventlistener to the submit button
        getBurgerBtn.addEventListener('submit',(e)=>{

            e.preventDefault();
            
        //  create an object
        const newBurger = { 
            // using the values from the specific elements
        burger_name: document.getElementById("bgrs").value.trim(),
        devoured: document.getElementById('devoured').checked,
        };
        // console.log(newBurger, "1")

        // this well send a post request 
        fetch('/api/burgers',{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type':'application/json',
            },
            // with this data to mysql db
            body: JSON.stringify(newBurger),
        }).then(()=>{
            // empty element brgrs value 
            document.getElementById('bgrs').value = '';
            console.log('Created a new burger');
            // reload the page 
            location.reload();
        });
    });

    }
})
