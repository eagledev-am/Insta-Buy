

// menu-icon
const menuIcon = document.getElementById("menu-icon")
const navLinks = document.getElementById("nav-links")

menuIcon.addEventListener('click', () => {
    isActive = navLinks.classList.toggle('show-links')
    console, console.log("Clikced Nav menu");
    let searchForm = document.querySelector('.search-input')
    if(isActive){
        console.log(searchForm.style.display);
        searchForm.style.display = 'none'
    }else{
        searchForm.style.display = 'flex'     
    }
}
)

const searchInput = document.getElementById('search-input')
const searchForm = document.getElementById('search-form')
let typing_timer;

searchInput.addEventListener('input', async (e) => {
    clearTimeout(typing_timer);
    typing_timer = setTimeout(() => {
        console.log(searchForm.action);
        searchForm.submit();
    }, 1000);
})




