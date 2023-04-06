$(".tombol").on("click", function () {
    const id = $(this).data("id");
    $("#modalTitle").html("تسجيل درجة الطالب");
    $("#student_id").val(id);
    $(".modal-footer button[type=submit]").html("تسجيل");
});
$(".tombolUbah").on("click", function () {
    const id = $(this).data("id");
    $("#modalTitle").html("تعديل درجة الطالب");
    $("#student_id").val(id);
    $(".modal-footer button[type=submit]").html("تعديل");
});

{
    /* <input type="hidden" name="_method" value="put"> */
}
$(".tombolnilai").on("click", function () {
    const lesson_id = $(this).data("grade");

    $("#syahr_awal").val("");
    $("#syahr_tsani").val("");
    $("#musyarokah").val("");
    $("#nihai").val("");
    $(".modal-content form").attr("action", `/qobul/grade/update/${lesson_id}`);
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content"),
        },
    });
    $.ajax({
        url: "/qobul/grade/getstudentgrade",
        type: "post",
        data: {
            lesson_id: lesson_id,
        },
        success: function (data) {
            console.log(data[0].syahr_awal);
            if (data[0].syahr_awal > 0) {
                $("#syahr_awal").val(data[0].syahr_awal);
            }
            if (data[0].syahr_tsani > 0) {
                $("#syahr_tsani").val(data[0].syahr_tsani);
            }
            if (data[0].musyarokah > 0) {
                $("#musyarokah").val(data[0].musyarokah);
            }
            if (data[0].fashli < 25) {
                $(".nihai").hide();
            } else {
                $(".nihai").show();
            }
            if (data[0].nihai != 0) {
                $("#nihai").val(data[0].nihai);
            }
            $("#grade").val(data[0].id);
            $("#student_id").val(data[0].student_id);
        },
    });
});
