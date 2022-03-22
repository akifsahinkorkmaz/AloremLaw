<script>
    import { onMount } from "svelte";

    let menu;
    let ham;
    let hamstate = true;

    ham = document.querySelector("nav .ham")
    menu = document.querySelector("nav ul")

    onMount(()=>{
        if (ham.style.display != "none") {
            ham.addEventListener("click", () => {
                if (hamstate) {
                    ham.children[0].style.transform = "translateY(0.30rem) rotate(30deg)";
                    ham.children[1].style.transform = "translateX(-44%) rotate(90deg)";
                    ham.children[2].style.transform = "translateY(-0.23rem) rotate(-30deg)";

                    hamstate = false

                    
                    menu.style.display = "block";
                    menu.style.transform = "translateX(0px)";

                    window.addEventListener("scroll", (e) => {
                        ham.children[0].style.transform = "";
                        ham.children[1].style.transform = "";
                        ham.children[2].style.transform = "";

                        hamstate = true

                        menu.style.display = "none",
                        menu.style.transform = "";
                    })
                }
                else {
                    ham.children[0].style.transform = "";
                    ham.children[1].style.transform = "";
                    ham.children[2].style.transform = "";

                    hamstate = true

                    menu.style.display = "none",
                    menu.style.transform = "";
                }
            })
        }
    });

</script>

<nav>
    <img src="media/banner.png" alt="ACK Hukuk Bürosu">

    <div bind:this={ham} class="ham">
        <hr class="t" noshade="">
        <hr class="m" noshade="">
        <hr class="b" noshade="">
    </div>

    <ul bind:this={menu}>
        <li>
            <a href="/">Services</a>
        </li>
        <li>
            <a href="/">About Us</a>
        </li>
        <li>
            <a href="/">Contact Us</a>
        </li>
    </ul>
</nav>

<style>
nav{
    background: #141615;
    background-color: #141615;

    color: #D5B36B;

    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 10vh;
    overflow-x: visible;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    z-index: 5;

    -webkit-box-shadow: 0px 3px 10px 2px rgba(20, 22, 21, 0.75);
    -moz-box-shadow: 0px 3px 10px 2px rgba(20, 22, 21, 0.75);
    box-shadow: 0px 3px 10px 2px rgba(20, 22, 21, 0.75);
}
nav img{
    height: 40%;
    width: auto;
    color: inherit;
}


.ham{
    position: absolute;
    top: 50%;
    right: 2rem;
    height: 1.5rem;
    width: 1.5rem;
    transform: translateY(-50%);
}
.ham hr{
    height: 3px;
    width: 1.5rem;
    margin: 0;
    border: none;
    border-radius: 50vh;
    background-color: #D5B36B;
    background: #D5B36B;
    
    position: absolute;
    display: block;
    transition: all 0.3s ease;
}
hr.t{
    top: 1px;
    left: 0;
}
hr.m{
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}
hr.b{
    bottom: 0;
    left: 0;
}

nav ul{
    position: absolute;
    z-index: 7;
    top: 100%;
    right: 0px;
    transform: translate(100%);
    
    transition: transform 0.3s ease;
    list-style: none;
    
    display: none;
    margin: 0;
    padding: 0 1.2rem;
    min-width: 40vw;
    height: 90vh;
    background: #141615;
    background-color: #141615;

    -webkit-box-shadow: -3px 0px 15px 3px rgba(20, 22, 21, 0.75);
    -moz-box-shadow: -3px 0px 15px 3px rgba(20, 22, 21, 0.75);
    box-shadow: -3px 0px 15px 3px rgba(20, 22, 21, 0.75);
}
nav ul li{
    display: block;
    width: auto;
    margin: 0px auto;    
}
nav ul li a {
    display: block;
    width: auto;
    margin: 1rem 0;
    padding: 0.4rem 1rem;
    border-radius: 50vh;
    border: 1px solid #D5B36B;

    color: inherit;
    text-align: center;
    font-weight: 500;
}
nav ul li a:focus, 
nav ul li a:hover {
    background-color: #D5B36B;
    background: #D5B36B;
    color: white;
    text-decoration: none;
}

@media only screen and (min-width: 600px){
    nav img{
        height: 50%;
    }
    .ham {
        display: none;
    }
    nav ul {
        position: relative;
        right: 0;
        top: 0;
        transform: translate(0px);
        background: none;

        padding: 0;
        min-width: 30vw;
        height: auto;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    nav ul li{
        margin: 0 0.5rem;    
    }
    nav ul li a {
        font-size: 0.8rem;
        margin: 0;
        padding: 0.2rem 0.6rem;
    }
}
</style>