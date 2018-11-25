// Initialize local storage spot for comments
if (localStorage.getItem("Comments") === null) {
    localStorage.setItem("Comments", JSON.stringify([]));
}

class Comment {
    constructor(name, text, time) {
        this.name = name;
        this.text = text;
        this.time = time;
        this.commentArr = JSON.parse(localStorage.getItem("comments"));
    }

    post() {
        commentArr.push({
            name: this.name,
            text: this.text,
            time: this.time
        })
        localStorage.setItem("comments", JSON.stringify(commentArr));
    }
}

// Post comment
function saveComment() {
    var comment = new Comment (
        document.getElementById("name").value,
        document.getElementById("comment").value,
        Date.now()
    )

    comment.post();
}

// Show comments
var commentArr = JSON.parse(localStorage.getItem("comments"));

for (let i=commentArr.length - 1; i >= 0; i--) {
    var displayComment = "<span style='font-size:70%'>" + commentArr[i].name + " wrote:</span><br>" 
                        + commentArr[i].text + "<br>" 
                        + "<span style='font-size:70%'>" + new Date(commentArr[i].time) + "</span><br>"
    
    document.getElementById("postedComment").innerHTML += displayComment
}