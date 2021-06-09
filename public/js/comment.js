
const comment = async (event) => {
    event.preventDefault();

    const pathName = window.location.pathname.split('/');
    const id = pathName[2]
    const comment = document.querySelector('#comment').value.trim();

    if (comment) {
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            document.location.reload();
          } else {
            console.log('ERROR')
          }
    }
};

const commentBtn = document.querySelector("#commentBtn")

commentBtn.addEventListener("click", comment)