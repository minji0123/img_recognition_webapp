function showLoading() {
    $(".loading-body").show();
    $(".result-div").hide();
    $(".image-title-wrap").hide();

}

function hideLoading() {
    $(".loading-body").hide();
    $(".result-div").show();
    $(".image-title-wrap").show();
}


function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();
            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);
        console.log('whatthe');
        showLoading();

        init().then(() => {
            predict();
            hideLoading();
        });
    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.result-message').html('');
    $('.result-Letter').html('');
    $('.result-image').attr('src', '');
    $('.result-ana-title').html('');
    $('.result-ana').html('');

    $('#myChart').remove();
    $('#canvas-div').html('<canvas id="myChart"></canvas>');


    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}

$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});

$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});


const URL = "https://teachablemachine.withgoogle.com/models/wymJDU9tJ/";

let model, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";


    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();


    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}


async function predict() {
    let image = document.getElementById("face-image")
    const prediction = await model.predict(image, false);

    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    console.log(prediction);
    console.log(prediction[0].className);


    let resultMessage;
    let resultLetter;
    let resultAnalysis;
    let resultAnaTitle;

    switch (prediction[0].className) {
        case "짱구":
            resultMessage = "짱구를 닮았네요!";
            resultLetter = "낙천적인 성격에 개그를 정말로 잘하는 '사고뭉치'";
            resultImage = "./image/zang.png";
            resultAnaTitle = "짱구는..."
            resultAnalysis = "◽ 신나있어요<br>◽ 눈이 동그래요<br>◽ 중안부가 보통이에요";
            break;

        case "철수":
            resultMessage = "철수를 닮았네요!";
            resultLetter = "부잣집 도련님, 완벽주의자인 떡잎마을 방범대의 '리더'";
            resultImage = "./image/chul.png";
            resultAnaTitle = "철수는...";
            resultAnalysis = "◽ 인상이 쎄요<br>◽ 눈이 또렷해요<br>◽ 중안부가 보통이에요";
            break;

        case "유리":
            resultMessage = "유리를 닮았네요!";
            resultLetter = "털털하고 자기주장 강한 솔직한 성격을 가진 '깍쟁이'";
            resultImage = "./image/you.png";
            resultAnaTitle = "유리는...";
            resultAnalysis = "◽ 인상이 순해요<br>◽ 눈이 초롱초롱해요<br>◽ 중안부가 보통이에요";
            break;

        case "수지":
            resultMessage = "수지를 닮았네요!";
            resultLetter = "부잣집 아가씨이자 엄친딸, 외모까지 이쁜 '공주님'";
            resultImage = "./image/sou.png";
            resultAnaTitle = "수지는...";
            resultAnalysis = "◽ 인상이 새침해요<br>◽ 눈이 매우 커요<br>◽ 중안부가 보통이에요";
            break;

        case "맹구":
            resultMessage = "맹구를 닮았네요!";
            resultLetter = "매우 과묵하며, 매사에 행동이 느릿느릿하고 멍한 '거북이'";
            resultImage = "./image/mang.png";
            resultAnaTitle = "맹구는...";
            resultAnalysis = "◽ 인상이 순해요<br>◽ 눈이 작아요<br>◽ 중안부가 길어요";
            break;

        case "훈이":
            resultMessage = "훈이를 닮았네요!";
            resultLetter = "상냥하고 솔직한 성격을 지녔지만 엄청난 울보에 겁이 많은 '찌질이'";
            resultImage = "./image/hunn.png";
            resultAnaTitle = "훈이는...";
            resultAnalysis = "◽ 울상이에요<br>◽ 눈이 작아요<br>◽ 중안부가 짧아요";
            break;

        default:
            resultMessage = "누구도 닮지 않았네요?!";
            resultLetter = "정보가 없어요";
            break;
    }

    $('.result-message').html(resultMessage);
    $('.result-Letter').html(resultLetter);
    $('.result-image').attr('src', resultImage);
    $('.result-ana-title').html(resultAnaTitle);
    $('.result-ana').html(resultAnalysis);

    colors = ['rgba(205, 197, 180, 1)',
                'rgba(181, 157, 164, 1)',
                'rgba(133, 117, 110, 1)',
                'rgba(109, 61, 20, 1)',
                'rgba(85, 27, 20, 1)',
                'rgba(4, 42, 43, 1)'
            ];

    characters = [];
    chart_json = [];


    for (let i = 0; i < prediction.length; i++) {
        chart_json.push({
            label: prediction[i].className,
            data: [prediction[i].probability],
            backgroundColor: colors[i],
            borderColor: colors[i],
            borderWidth: 1
        });
        characters.push(
            prediction[i].className
        );
    }



    /*차트*/

    let ctx = document.getElementById('myChart').getContext('2d');
    //            ctx.clearRect(0, 0, canvas.width, canvas.height);

    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [''],
            datasets: chart_json
        },

        options: {
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        } // 옵션 끝

    });
}
