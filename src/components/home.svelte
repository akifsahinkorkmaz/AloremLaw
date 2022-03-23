<script>
    import Footer from "./footer.svelte";
    import { onMount } from "svelte";
    onMount(()=>{
        setTimeout(() => {
            if(window.confirm("This is an artistic project. See disclaimer below!")){
                window.location.href = "#disclaimer"
            }
        }, 5000);
    });
</script>

<article>
    <div id="landing">
        <div class="image">
            <img src="media/bookshelf.jpg" alt="Book Shelf">
            <div></div>
        </div>
        <div class="content">
            <h1>ALOREM Law Firm</h1>
            <h2>Lorem Ipsum Dolor!</h2>
            <p> Sit, amet consectetur adipisicing elit. Officia, laboriosam. Incidunt recusandae cupiditate veritatis, voluptates quidem voluptas id ea labore quas sint, delectus dolorem! Sequi sed corrupti delectus tempora. <a href="/">Learn more about us.</a></p>
        </div>
        <div class="services">
    
            <h2>Our Services</h2>
            <div>
                <a href="/"><p>Lorem Ipsum</p></a>
                <a href="/"><p>Dolor Sit Amet</p></a>
                <a href="/"><p>amet consectetur</p></a>
                <a href="/"><p>adipisicing</p></a>
                <a href="/"><p>Officia laboriosam</p></a>
                <a href="/"><p>Incidunt</p></a>
            </div>
        </div>
    </div>
    

    <div id="team">
        <h2>Our Team</h2>

        <div class="members">
            <hr noshade="">

            <div class="member">
                <img src="media/team1.png" alt="Team Member">
                <h3>Atty. Lorem Ipsum Dolor</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus molestiae unde atque, quaerat id, nihil repudiandae eius sed ab perspiciatis perferendis earum similique aspernatur aliquid itaque ipsam? Explicabo, incidunt ea. </p>
            </div>

            <hr noshade="">
            
            <div class="member">
                <img src="media/team2.png" alt="Team Member">
                <h3>Atty. Sitamet Consectetur</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam suscipit totam quia vero tenetur quasi reiciendis est dolorum perferendis labore laboriosam asperiores hic, excepturi quam fugiat corporis doloremque minus adipisci?</p>
            </div>
            
            <hr noshade="">

            <div class="member">
                <img src="media/team3.png" alt="Team Member">
                <h3>Lwy. Magnam Suscipit</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus maiores nostrum excepturi fugit amet voluptate praesentium aliquid reprehenderit natus facilis reiciendis, blanditiis debitis repellat soluta id explicabo dicta sit consequuntur!</p>
            </div>

            <hr noshade="">

            <div class="member">
                <img src="media/team4.png" alt="Team Member">
                <h3>Secy. Delectus Maiores</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi aliquid veritatis omnis ipsam rem distinctio eius qui quibusdam minus temporibus consequatur obcaecati cupiditate fugiat earum eligendi incidunt, a itaque inventore.</p>
            </div>

            <hr noshade="">
            
            <div class="member">
                <img src="media/team5.png" alt="Team Member">
                <h3>Secy. Nisi Aliquid</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quaerat ea ratione voluptatibus dignissimos ullam, sapiente ex tempore dolorem libero debitis nulla earum consequatur excepturi illum ipsa corrupti error autem.</p>
            </div>
            
            <hr noshade="">
            
        </div>
       
    </div>


    <div id="cases">
        <h2>Recent Cases</h2>

        <div class="cases">
            <hr noshade="">

            <div class="case">
                <img src="media/case1.jpg" alt="Coffe Shop">
                <h3>Coffe Shop vs Municipality</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus aliquid deserunt quibusdam nesciunt perferendis maxime incidunt. Qui aspernatur at optio ad illo amet, aut dolorem, quo sed voluptates consequuntur voluptate? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga dolor iste nisi quae, maiores neque rem veniam sapiente repudiandae quia sequi non aperiam ratione facere deserunt itaque illum possimus eligendi!</p>
            </div>

            <hr noshade="">

            <div class="case">
                <img src="media/case2.jpg" alt="Clothing Shop">
                <h3>Clothing Co. vs Mall</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, consectetur provident temporibus dolorem possimus, at sapiente minus debitis modi nisi dolore deserunt laborum consequatur impedit corrupti facilis quaerat vel eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis omnis provident quasi, aliquam perspiciatis ipsum quaerat deserunt quod voluptas dicta, veritatis ducimus vitae nostrum nam nihil adipisci id recusandae ea?</p>
            </div>

            <hr noshade="">

            <div class="case">
                <img src="media/case3.jpg" alt="Workers">
                <h3>Workers vs Construction Co.</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In numquam placeat cupiditate libero blanditiis aut ducimus! Corrupti quo sapiente numquam consequatur tenetur, nobis consectetur aperiam, vero sunt commodi recusandae libero? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium nihil, natus qui, tenetur porro repellat exercitationem aut ullam sit libero iste amet ipsum eligendi sunt sapiente illo placeat consectetur laboriosam.</p>
            </div>
        </div>
       
    </div>


    <div id="disclaimer">
        
        <h2>Disclaimer</h2>
        <ul>
            <li>
                <p>This is not a legitimate Law Firm's website.</p>
            </li>
            <li>
                <p>None of the contents of this website is real, all made up!</p>
            </li>
            <li>
                <p>This website is coded purely for artistic purposes.</p>
            </li>
        </ul>
        <h2>Disclaimer</h2>
        
    </div>

    
    <Footer/>
</article>

<style>
    article {
        position: absolute;
        top: 10vh;
        width: 100vw;
        left: 0;
        background: #141615;
    }
    article .image{
        position: relative;
    }
    article .image img,
    article .image div{
        width: 100vw;
        height: 20vh;
        object-fit: cover;
    }
    article .image div{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        background: linear-gradient(to top, rgba(20, 22, 21, 1), rgba(20,21,21,0), rgba(20,21,21,0) );
    }

    article .content{
        padding-right: 3rem;
        padding-left: 1rem;
        margin-top: 2rem;
    }
    h1{
        font-size: xx-large;
        color: #D5B36B;
        margin-bottom: 0.2rem;
    }
    .content a, .content h2{
        font-size: large;
        text-align: left;
        font-weight: 400;
        color: #e3e3e3;
    }
    p{
        margin-top: 1.2rem;
        font-size: medium;
        color: #e3e3e3;
    }
    .content p a {
        font-size: medium;
        color: #D5B36B;
    }

    .services,
    #team, 
    #disclaimer{
        margin-top: 3rem;
        padding-right: 3rem;
        padding-left: 1rem;
    }
    h2{
        text-align: center;
        color: #D5B36B;
        font-weight: 400;
        font-size: larger;
        margin-bottom: 1rem;
        text-transform: uppercase;
    }
    .services div{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .services a {
        padding: 0.4rem 1rem;
        margin: 0.4rem 0.2rem;
        border-radius: 50vh;
        border: 1px solid #D5B36B;
        transition: all 0.3s ease;
    }
    .services a:hover {
        text-decoration: none;
        background: #D5B36B;
    }
    .services a:hover p {
        color: white;
    }
    .services p{
        margin: 0;
        color: #D5B36B;
        text-transform: capitalize;
    }

    #team,
    #cases{
        margin-top: 3rem;
        margin-bottom: 2rem;
    } 
    #team > *,
    #team .members > *,
    #cases > *,
    #cases .cases > *{
        margin-top: 1.2rem;
    }
    #team hr,
    #cases hr{
        height: 1px;
        border: none;
        background-color: #D5B36B;
    }
    #team .member img,
    #cases .case img{
        display: block;
        margin: 0 auto;
        width: 90%;
        height: auto;
        border: 1px solid #D5B36B;
    }
    #team .member h3,
    #cases .case h3{
        color: #e3e3e3;
        text-align: center;
        margin-top: 1rem;
    }
    #team .member p{
        text-align: center;
    }  
    #cases .case img{
        display: block;
        margin: 0 auto;
        width: 90%;

        min-height: 250px;
        height: 40vh;
        max-width: 400px;
        object-fit: cover;

        border: 1px solid #D5B36B;
    }
 
    #disclaimer{
        max-width: 600px;
        margin: 0 auto;
        margin-bottom: 2rem;
        
        padding: 1rem 1rem;
        padding-right: 2rem;
        border: 1px solid #D5B36B;
    }
    #disclaimer ul{
        padding-left: 1rem;
        margin-bottom: 1rem;
        list-style: none;
    }
    #disclaimer h2{
        padding-left: 1rem;
        text-align: left;
    }
 
 
    
    @media only screen and (min-width:600px){
        
        article .image{
            position: absolute;
            top: 0;
            left: 0;
        }
        article .image img,
        article .image div{
            width: 40vw;
            height: 90vh;
        }
        article .image div{
            background: linear-gradient(to left, rgba(20, 22, 21, 1), rgba(20,21,21,0), rgba(20,21,21,0) );
        }
        #landing{
            margin-left: 42vw;
            height: 90vh;

            overflow-x: hidden;
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        }
        .services a {
            padding: 0.2rem 0.5rem;
            margin: 0.2rem 0.1rem;
        }
        .services p{
            font-size: medium;
        }
        .members,
        .cases{
            display: flex;
            align-items: baseline;
            justify-content: space-evenly;
            flex-wrap: wrap;
        }
        #team hr,
        #cases hr{
            display: none;
        }
        #team .member{
            min-width: 250px;
            width: 35vw;
            max-width: 300px;
            margin: 1rem;
            padding-bottom: 2rem;
        }
        #team .member img{
            min-width: 250px;
            width: 35vw;
            max-width: 300px;
        }


        #cases .case{
            min-width: 250px;
            width: 40vw;
            max-width: 500px;
            margin: 1rem;
            padding-bottom: 2rem;
        }
        #cases .case img{
            min-width: 250px;
            width: 40vw;
            max-width: 500px;
        }
    }

    @media only screen and (min-width:700px){
        .services a {
            padding: 0.4rem 1rem;
            margin: 0.4rem 0.2rem;
        }
        .services p{
            font-size: large;
        }
    }

    @media only screen and (min-width:1080px){
        .services{
            padding-right: 10vw;
        }
        .services a {
            padding: 0.6rem 1.5rem;
            margin: 0.6rem 0.3rem;
        }
        .services p{
            font-size: large;
        }
    }

</style>