class Comment {
    constructor(author, text, time) {
        this.author = author; // Author of the comment
        this.text = text;
        this.time = time; // Time in milliseconds
    }

    stringifyComment() { // Build a readable comment block for a single comment
        var comment = "<span style='font-size:70%'>" + this.author + " wrote:</span><br>" 
                         + this.text + "<br>" 
                         + "<span style='font-size:70%'>" + new Date(this.time) + "</span><br>";
        return comment
    }
}