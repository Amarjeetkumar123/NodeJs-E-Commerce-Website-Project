
const allLikeButton = document.querySelectorAll(".like-button");

async function likeButton(productid,btn) {
    try {
      // Send a POST request
      const response = await axios({
        method: "post",
        url: `/products/${productid}/like`,
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
        console.log(response);

        if (btn.children[0].classList.contains('fas')) {
            btn.children[0].classList.remove("fas");
            btn.children[0].classList.add("far");
        }
        else {
            btn.children[0].classList.add("fas");
            btn.children[0].classList.remove("far");
        }
    } catch (error) {
        // used to redirect the browser using javaScript
        window.location.replace('/login');
        console.log(error.message);
    }
 
}

for (let btn of allLikeButton) {
    btn.addEventListener('click', () => {
        const productid = btn.getAttribute("product-id");

        likeButton(productid,btn);
        
    })
}