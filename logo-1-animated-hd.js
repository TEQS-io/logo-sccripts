
/**
 * @file logo-1-animated-hd.js
 * @description This script creates an animated high-resolution retro-style satellite orbiting the Earth with a swath visualization.
 * @date 2025-01-15
 * @author Taimur Khan
 */

/**
 * Sets up the canvas and initial configurations.
 */
function setup() {}

/**
 * Draws the animation frame by frame.
 */
function draw() {}

/**
 * Draws the Earth on the canvas.
 * @param {number} x - The x-coordinate of the Earth's center.
 * @param {number} y - The y-coordinate of the Earth's center.
 * @param {number} size - The diameter of the Earth.
 */
function drawEarth(x, y, size) {}

/**
 * Draws the satellite on the canvas.
 * @param {number} x - The x-coordinate of the satellite's center.
 * @param {number} y - The y-coordinate of the satellite's center.
 * @param {number} size - The size of the satellite.
 */
function drawSatellite(x, y, size) {}

/**
 * Draws the swath on the Earth's surface.
 * @param {number} x - The x-coordinate of the Earth's center.
 * @param {number} y - The y-coordinate of the Earth's center.
 * @param {number} earthSize - The diameter of the Earth.
 * @param {number} startAngle - The starting angle of the swath.
 * @param {number} endAngle - The ending angle of the swath.
 */
function drawSwath(x, y, earthSize, startAngle, endAngle) {}

/**
 * Draws connecting lines from the satellite to the swath edges.
 * @param {number} satX - The x-coordinate of the satellite's center.
 * @param {number} satY - The y-coordinate of the satellite's center.
 * @param {number} satSize - The size of the satellite.
 * @param {number} earthX - The x-coordinate of the Earth's center.
 * @param {number} earthY - The y-coordinate of the Earth's center.
 * @param {number} earthSize - The diameter of the Earth.
 * @param {number} startAngle - The starting angle of the swath.
 * @param {number} endAngle - The ending angle of the swath.
 */
function drawConnectingLinesToSwath(satX, satY, satSize, earthX, earthY, earthSize, startAngle, endAngle) {}

/**
 * Saves a 5-second GIF when the user presses the 's' key.
 */
function keyPressed() {}
let angle = 0; // Angle for satellite revolution

function setup() {
  let canvas = createCanvas(1000, 1000); // High-resolution canvas
  canvas.style('background', 'transparent'); // Transparent background
  noSmooth(); // Ensure the 8-bit pixelated style
  pixelDensity(2); // Increase pixel density for high-res rendering
}

function draw() {
  clear(); // Clear canvas for transparency

  const earthX = 500;
  const earthY = 700;
  const earthSize = 400;
  const satOrbitRadius = 500;
  const satSize = 40;

  drawEarth(earthX, earthY, earthSize); // Draw the Earth

  // Calculate satellite position
  const satX = earthX + cos(angle) * satOrbitRadius;
  const satY = earthY + sin(angle) * satOrbitRadius;
  drawSatellite(satX, satY, satSize); // Draw the satellite

  // Calculate swath angles based on satellite position
  const swathStartAngle = angle + QUARTER_PI;
  const swathEndAngle = angle - QUARTER_PI;
  drawSwath(earthX, earthY, earthSize, swathStartAngle, swathEndAngle); // Draw the swath

  drawConnectingLinesToSwath(satX, satY, satSize, earthX, earthY, earthSize, swathStartAngle, swathEndAngle); // Draw lines from satellite to swath edges

  angle += 0.01; // Increment angle for animation
}

function drawEarth(x, y, size) {
  fill(0, 0, 255); // Retro blue for Earth
  ellipse(x, y, size, size); // Earth as a circle
}

function drawSatellite(x, y, size) {
  fill(192, 192, 192); // Retro gray for satellite body
  rect(x - size, y - size / 2, size * 2, size); // Satellite body

  fill(255, 255, 0); // Yellow for solar panels
  rect(x - size * 3, y - size / 4, size * 2, size / 2); // Left solar panel
  rect(x + size, y - size / 4, size * 2, size / 2); // Right solar panel
}

function drawSwath(x, y, earthSize, startAngle, endAngle) {
  fill(0, 255, 0, 150); // Transparent green for swath
  noStroke();
  arc(x, y, earthSize, earthSize, startAngle, endAngle, PIE);

  stroke(255, 0, 0); // Red for dotted line
  strokeWeight(2);
  drawingContext.setLineDash([10, 10]); // Dotted line pattern
  noFill();
  arc(x, y, earthSize, earthSize, startAngle, endAngle);
  drawingContext.setLineDash([]); // Reset line dash
}

function drawConnectingLinesToSwath(satX, satY, satSize, earthX, earthY, earthSize, startAngle, endAngle) {
  stroke(255, 0, 0); // Red for connecting lines
  strokeWeight(2);

  const swathRadius = earthSize / 2;

  // Calculate swath edge points
  const leftSwathX = earthX + cos(startAngle) * swathRadius;
  const leftSwathY = earthY + sin(startAngle) * swathRadius;

  const rightSwathX = earthX + cos(endAngle) * swathRadius;
  const rightSwathY = earthY + sin(endAngle) * swathRadius;

  // Left panel to left swath edge
  line(satX - satSize * 3, satY, leftSwathX, leftSwathY);
  
  // Right panel to right swath edge
  line(satX + satSize * 3, satY, rightSwathX, rightSwathY);
}

// Save a 5-second GIF when the user presses the 's' key
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveGif('retro_satellite.gif', 8); // Save a 5-second GIF
  }
}
