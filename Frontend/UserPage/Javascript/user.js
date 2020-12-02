const toUpload = () => {
    window.location.replace("../../UploadPage/HTML/index.html");
}

const toUser = () => {
    window.location.replace("../../AccountSetting/HTML/account.html");
}

const navigate_ebook = () => {
    window.location.replace("../../EBookDisplay/HTML/display.html");
}

const display_results = (data) => {
    let parent = document.getElementById("search_results");
    while(parent.firstChild) {
        parent.firstChild.remove();
    }
    for (let i = 0; i < data.length; i++) {
        let link = document.createElement("a");
        let linkInfo = document.createElement("div");
        let new_div = document.createElement("div");
        new_div.className = "eBookLinks"
        link.href = "../../EBookDisplay/HTML/display.html";
        let ebook =  data[i];
        link.innerHTML = `${titleCase(ebook.title)}\n`;
        linkInfo.innerHTML = `Author: ${titleCase(ebook.author)}\nPublished Year: ${ebook.year}\nGenre: ${titleCase(ebook.genre)}\n\n`;
        link.onclick = () => {
            sessionStorage.setItem("title", ebook.title);
            sessionStorage.setItem("author", ebook.author);
            sessionStorage.setItem("year", ebook.year);
            sessionStorage.setItem("content", ebook.content);
            sessionStorage.setItem("genre", ebook.genre);
            sessionStorage.setItem("bookID", ebook.id);
            sessionStorage.setItem("eBookOwnership", ebook.userID);            
        }
        new_div.appendChild(link);
        new_div.appendChild(linkInfo);
        document.getElementById("search_results").appendChild(new_div);
    }
}

const search_by_title = (title) => {
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/title/${title}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_genre = (genre) => {
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/genre/${genre}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_author = (author) => {
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/author/${author}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_year = (year) => {
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/year/${year}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_user = () => {
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/youruploads`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_all_ebooks = () => {
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_by_specific_user = (specific_user) => {
    let token = sessionStorage.getItem("token");
    axios({
        method: 'GET',
        url: `${BASE_URL}/api/ebooks/uploader/${specific_user}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        display_results(response.data.msg);
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

const search_function = () => {
    let search = document.getElementById("eb_search").value;
    let search_choice = document.getElementById("search_o");
    let search_option;

    for (let i = 0; i < search_choice.length; i++) {
        if (search_choice[i].checked) {
            search_option = search_choice[i].value;
            break;
        }
    }
    console.log(search_option);
    if (search_option == "title") {
        search_by_title(search.toLowerCase());
    } else if (search_option == "genre") {
        search_by_genre(search.toLowerCase());
    } else if (search_option == "author") {
        search_by_author(search.toLowerCase());
    } else if (search_option == "year") {
        search_by_year(search);
    } else if (search_option == "user") {
        search_by_specific_user(search.toLowerCase());
    }
}

const pageNavigation = (userInfo) => {
    let upload = document.getElementById("eb_upload");
    let user = document.getElementById("user_info_settings");
    let submit = document.getElementById("eb_submit");
    let user_search = document.getElementById("eb_user_search");
    let all_search = document.getElementById("eb_total_search");

    user_search.value = `${userInfo.username}'s eBooks`
    upload.onclick = toUpload;
    user.onclick = toUser;
    submit.onclick = search_function;
    user_search.onclick = search_by_user;
    all_search.onclick = search_all_ebooks;
}

const signOut = () => {
    sessionStorage.clear();
    redirectToHome();
}

const user = getUser();

const main = () => {
    console.log(user);
    if (checkUserForNull(user)) {
        redirectToHome();
    }
    pageNavigation(user);
}

main();