var $canvas,$output,$outputInfo,$png8bit;
var $width,$height,$color1,$color2,$strength,
    $squareProportion,$inverseColors,$fullscreenPreview;
var inputTimeoutHandler;

$().ready(function() {

    $("input.color").spectrum({
        preferredFormat:'hex',
        allowAlpha:true,
        clickoutFiresChange: true,
        changeOnMove:true,
        showInput: true
    });

    $canvas = $("#canvas");
    $output = $("#output");
    $outputInfo = $("#output-info");

    $width = $("[name=width]");
    $height = $("[name=height]");
    $color1= $("[name=color1]");
    $color2= $("[name=color2]");
    $strength = $("[name=strength]");
    $squareProportion= $("[name=square-proportion]");
    $inverseColors = $("[name=inverse-colors]");
    $fullscreenPreview = $("[name=fullscreen-preview]");

    $png8bit = $("#png8bit");

    $output.bind("focus",function(e) {
        $output.select();
        $output.one("mouseup",function() {return false});
        return false
    });

    $strength.change(function() {
        $strength.val(this.value);
    })

    $("#generate-noise").submit(function() {
        if ($squareProportion.is(":checked")) {
            $height.attr("disabled","disabled");
            $height.val($width.val());

        } else {
            $height.removeAttr("disabled");
        }

        if (inputTimeoutHandler) clearTimeout(inputTimeoutHandler);
        inputTimeoutHandler = setTimeout(function() {
            generate_noise();
        },100);
        return false;
    }).bind("input change",function() {
        $(this).trigger("submit");
    });

    generate_noise();
});

function generate_noise() {

    var width = parseInt($width.val());
    var height = parseInt($height.val());
    var strength = parseInt($strength.val())/100;

    var inverseColors = $inverseColors.is(":checked");
    var png8bit = $png8bit.is(":checked");

    var fullscreenPreview = $fullscreenPreview.is(":checked");

    var color1,color2;

    if (inverseColors) {
        color1 = $color2.val();
        color2 = $color1.val();
    } else {
        color1 = $color1.val();
        color2 = $color2.val();
    }

    if ($canvas.length) {
        var c = $canvas[0];
        c.width=width;
        c.height=height;

        var ctx = $canvas[0].getContext("2d");
        var w = ctx.canvas.width;
        var h = ctx.canvas.height;

        ctx.fillStyle=color1;
        ctx.fillRect(0,0,w,h);

        // mix color for fallback

        var c1 = hexToRgb(color1);
        var c2 = hexToRgb(color2);


        var mixColor = {
            r:parseInt(weightNumbers(c1.r,c2.r,strength/5)),
            g:parseInt(weightNumbers(c1.g,c2.g,strength/5)),
            b:parseInt(weightNumbers(c1.b,c2.b,strength/5))
        };
        mixColor = rgbToHex(mixColor.r,mixColor.g,mixColor.b);

        for (var x = 0; x < w; x++) {
            for (var y = 0; y < h; y++ ) {
                //var normal_random = rnd_bmt();
                var rand_alpha = Math.random() * strength;
                ctx.fillStyle = "rgba(" + c2.r + "," + c2.g + "," + c2.b + ","+rand_alpha+")";
                ctx.fillRect(x,y,1,1);
            }
        }

        var pngUrl = c.toDataURL();

        if (png8bit && strength) {
            $.ajax({
                url: "base64-png-compress.php",
                type: 'post',
                data: {base64: pngUrl},
                success: function (data) {
                    pngUrl = data;
                    var cssPropertyValue = mixColor + " url(" + pngUrl + ")";
                    var output_message = "background:" + cssPropertyValue + ";";
                    var bytes = output_message.length;

                    $output.val(output_message);
                    $outputInfo.html("Size: " + bytesToSize(bytes));

                    if (fullscreenPreview) {
                        $("body").css("background", cssPropertyValue);
                    } else {
                        $("body").css("background", mixColor);
                    }
                }
            })

        } else {



            var cssPropertyValue = mixColor + " url(" + pngUrl + ")";
            if (strength == 0 ) cssPropertyValue = mixColor;

            var output_message = "background:" + cssPropertyValue + ";";
            var bytes = output_message.length;



            $output.val(output_message);
            $outputInfo.html("Size: " + bytesToSize(bytes));
            $("body").css("background", cssPropertyValue);

            if (fullscreenPreview) {
                $("body").css("background", cssPropertyValue);
            } else {
                $("body").css("background", mixColor);
            }
        }

    } else {
        alert("#canvas not found!")
    }


}
function rnd_bmt() {
    var x = 0, y = 0, rds, c;

    // Get two random numbers from -1 to 1.
    // If the radius is zero or greater than 1, throw them out and pick two new ones
    // Rejection sampling throws away about 20% of the pairs.
    do {
        x = Math.random()*2-1;
        y = Math.random()*2-1;
        rds = x*x + y*y;
    }
    while (rds == 0 || rds > 1)

    // This magic is the Box-Muller Transform
    c = Math.sqrt(-2*Math.log(rds)/rds);

    // It always creates a pair of numbers. I'll return them in an array.
    // This function is quite efficient so don't be afraid to throw one away if you don't need both.
    return [x*c, y*c];
}
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


function bytesToSize(bytes) {
    if(bytes == 0) return '0 Byte';
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}


function weightNumbers(x1,x2,strength) {
    return x1*(1-strength) + x2*(strength);
}
