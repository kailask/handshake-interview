$(document).ready(() => {
    const postURL = 'http://localhost:3000/post';

    $('#post_btn').click(() => {
        var text = $('#new_chirp').val();

        if (text.length > 0 && text.length <= 140) {
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
        }
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
    vote($(chirp).attr('name'),1);
}

function downvote(chirp) {
    vote($(chirp).attr('name'),-1)
}

function vote(id,vote){
    const voteURL = 'http://localhost:3000/vote';

    var data = JSON.stringify({ "id": id, vote: vote });

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