const {listOfPosts} = require("./posts");

const getSum = (s1, s2) => {
    if (typeof s1 != "string" || isNaN(s1) || typeof s2 != "string" || isNaN(s2)) {
        return false;
    }
    return `${Number(s1) + Number(s2)}`;
};

const getQuantityPostsByAuthor = (postsArr, authorName) => {
    let posts = postsArr.filter(post => post.author === authorName);
    let comments = postsArr.reduce((sum, post) => {
        return sum + (post.comments === undefined ? 0 : post.comments.filter(comment => comment.author === authorName).length)
    }, 0);
    return `Post:${posts.length},comments:${comments}`;
};

const tickets = (arr) => {
    let clerksMoney = 0;
    for (const v of arr) {
        if (clerksMoney >= v - 25) {
            clerksMoney += 25;
        } else {
            return "NO";
        }
    }
    return "YES";
};
module.exports = {getSum, getQuantityPostsByAuthor, tickets};
