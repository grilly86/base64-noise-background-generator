<?php
    if (isset($_POST["base64"])) {

        $base64 = $_POST["base64"];
        $base64 = explode(",",$base64);
        $base64 = $base64[1];

        file_put_contents("temp.png",base64_decode($base64));
        convertPNGto8bitPNG("temp.png","temp8bit.png");

        $data = file_get_contents("temp8bit.png");
        $base64 = 'data:image/png;base64,' . base64_encode($data);

        echo $base64;
        unlink("temp.png");
        unlink("temp8bit.png");

    } else {
        echo "no image data";
    }



function convertPNGto8bitPNG($sourcePath, $destPath) {
    $srcimage = imagecreatefrompng($sourcePath);
    list($width, $height) = getimagesize($sourcePath);
    $img = imagecreatetruecolor($width, $height);
    $bga = imagecolorallocatealpha($img, 0, 0, 0, 127);
    imagecolortransparent($img, $bga);
    imagefill($img, 0, 0, $bga);
    imagecopy($img, $srcimage, 0, 0, 0, 0, $width, $height);
    imagetruecolortopalette($img, false, 255);
    imagesavealpha($img, true);
    imagepng($img, $destPath);
    imagedestroy($img);
}