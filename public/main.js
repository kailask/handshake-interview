$(document).ready(() => {
    const postURL = 'http://localhost:3000/post';

    $('#post_btn').click(() => {
        console.log($('#new_chirp').val());
        var data = JSON.stringify({ "chirp": $('#new_chirp').val() });
        $.ajax({
            url: postURL,
            type: "POST",
            data: data,
            contentType: 'application/json',
            success: function (result) {
                console.log(result);
                location.reload(true);
            }
        });
    })
})

// $('.vote_btn').click(() => {
//     console.log($(this));
//     // var data = JSON.stringify({ "chirp": $('#new_chirp').val() });
//     // $.ajax({
//     //     url: postURL,
//     //     type: "POST",
//     //     data: data,
//     //     contentType: 'application/json',
//     //     success: function (result) {
//     //         console.log(result);
//     //     }
//     // });
// })

function upvote(chirp) {
    const voteURL = 'http://localhost:3000/vote';

    var data = JSON.stringify({ "id": parseInt($(chirp).attr('name')) });
    $.ajax({
        url: voteURL,
        type: "POST",
        data: data,
        contentType: 'application/json',
        success: function (result) {
            console.log(result);
            location.reload(true);
        }
    });

}