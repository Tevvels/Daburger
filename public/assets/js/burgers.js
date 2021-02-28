document.addEventListener('DOMContentLoaded',(event)=>{
    if(event){
        console.log('DOM loaded');
    }
    const getDevoured = document.querySelectorAll('.has-eaten');
    if(getDevoured) {
        getDevoured.forEach((btn)=>{
            btn.addEventListener('click',(e)=>{
                const id = e.target.getAttribute('data-id');
                const gotDevoured = e.target.getAttribute('data-devoured')
                // console.log(id,gotDevoured)
                 let parsenumber = parseInt(gotDevoured) + 1;
                const devouredState = {
                    devoured: parsenumber,
                };
                console.log(devouredState);


                fetch(`/api/burgers/${id}`,{
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify(devouredState),

                }).then((response)=>{
                    if(response.ok) {
                        console.log(`changed devoured to ${gotDevoured}`);
                        location.reload('/');

                    } else {
                        alert('something went wrong');
                    }
                });
            })
        })
    }
    const getBurgerBtn  = document.getElementById('create-burger');
    burger_names = document.getElementById("bgrs").value.trim(),
    dvs = document.getElementById('devoured').checked
    // console.log(getBurgerBtn,burger_names,dvs)

    if(getBurgerBtn)  {
        getBurgerBtn.addEventListener('submit',(e)=>{
            e.preventDefault();
     
        const newBurger = { 
        burger_name: document.getElementById("bgrs").value.trim(),
        devoured: document.getElementById('devoured').checked,
        };
        // console.log(newBurger, "1")


        fetch('/api/burgers',{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type':'application/json',
            },

            body: JSON.stringify(newBurger),
        }).then(()=>{
            document.getElementById('bgrs').value = '';
            console.log('Created a new burger');
            location.reload();
        });
    });

    }
})
