<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>

    <link rel="stylesheet" href="css/style.css" />
</head>
<body>
<div class="tc">
    <h1>base64 noise generator</h1>
    <p>request-less CSS background-images.<p>
    <h2>make some noise!</h2>
    <a href="http://codeblock.at/2015/02/css-noise-background-base-64-generator/">info</a>
</div>
<div class="settings">
<fieldset>
    <legend>Settings</legend>
    <form id="generate-noise">

    <div class="wrap">
        <div class="right-settings">
            <div class="unifier"></div>
            <label title="Link width and height - result will be a square.">
                <i class="fa fa-lg fa-link fa-fw "></i><input type="checkbox" name="square-proportion" />
            </label>
        </div>
        <label>
            <span>Width</span>
            <input type="number" name="width" value="48" />
            <span>px</span>
        </label>
        <label>
            <span>Height</span>
            <input type="number" name="height" value="48" />
            <span>px</span>
        </label>
    </div>
    <div class="wrap">
        <div class="right-settings">
            <div class="unifier"></div>
            <label title="Switches colors.">
                <i class="fa fa-lg fa-random fa-fw"></i><input type="checkbox" name="inverse-colors" />
            </label>
        </div>
        <label>
            <span>Background</span>
            <input class="color" name="color1" value="#444444" />
        </label>
        <label>
            <span>Noise Color</span>
            <input class="color" name="color2" value="#666666" />
        </label>
    </div>
    <label>
        <span>Strength</span>
        <input type="number" name="strength" min="0" max="100" value="50" />
        <span>%</span>
        <input type="range" name="strength" min="0" max="100" value="50" />
    </label>
    <div class="label">
        <label>
            <input type="radio" id="png8bit" name="png8bit" value="1" checked="checked" /> 8 bit  <em>(recommended)</em>
        </label>
        <label>
            <input type="radio" name="png8bit" value="0"  /> 24 bit
        </label>
    </div>
    <hr>
    <label>
        <input type="checkbox" name="fullscreen-preview" checked="checked" /> Preview tiled as page background
    </label>
    <button class="cta">Randomize</button>
    </form>
</fieldset>
</div>
<div class="content">
    <fieldset>
        <legend>Preview</legend>
        <canvas id=canvas width="100" height="100"></canvas>
    </fieldset>
    <fieldset>
        <legend>CSS Output</legend>
        <span id="output-info"></span> <em>(smaller is better)</em>
        <textarea id="output" readonly></textarea>
    </fieldset>
</div>
<div class="tc">
    <p>Feel free to use the images as you like. Randomize several times until you get a nice result.</p>
    <p>by Christian Frauscher</p>
</div>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/spectrum.js"></script>
<script type="text/javascript" src="js/app.js"></script>

</body>
</html>