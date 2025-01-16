/**
 * @author Taimur Khan
 * 
 * TEQS.io Logo v1 in HD
 *
 * @param {number} satX - The x-coordinate of the satellite.
 * @param {number} satY - The y-coordinate of the satellite.
 * @param {number} satSize - The size of the satellite.
 * @param {number} earthX - The x-coordinate of the Earth.
 * @param {number} earthY - The y-coordinate of the Earth.
 * @param {number} earthSize - The size of the Earth.
 */

function setup() {
    let canvas = createCanvas(1000, 1000); // High resolution canvas
    canvas.style('background', 'transparent'); // Transparent background
    noSmooth(); // Ensure the 8-bit pixelated style
    pixelDensity(2); // Increase pixel density for high-res rendering
  }
  
  function draw() {
    clear(); // Clear canvas for transparency
  
    drawEarth(500, 700, 400); // Draw the Earth with a larger size
    drawSatellite(500, 200, 40); // Draw the satellite
    drawSwath(500, 700, 400, 200); // Draw the swath on Earth
    drawConnectingLinesToSwath(500, 200, 40, 500, 700, 400); // Draw lines from satellite to swath edges
  
    noLoop(); // Stop the draw loop since this is static
    saveCanvas('retro_satellite', 'png'); // Save as PNG
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
  
  function drawSwath(x, y, earthSize, swathWidth) {
    fill(0, 255, 0, 150); // Transparent green for swath
    noStroke();
    arc(x, y, earthSize, earthSize, PI + QUARTER_PI, TWO_PI - QUARTER_PI, PIE);
  
    stroke(255, 0, 0); // Red for dotted line
    strokeWeight(2);
    drawingContext.setLineDash([10, 10]); // Dotted line pattern
    noFill();
    arc(x, y, earthSize, earthSize, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    drawingContext.setLineDash([]); // Reset line dash
  }
  
  function drawConnectingLinesToSwath(satX, satY, satSize, earthX, earthY, earthSize) {
    stroke(255, 0, 0); // Red for connecting lines
    strokeWeight(2);
  
    const swathStartAngle = PI + QUARTER_PI;
    const swathEndAngle = TWO_PI - QUARTER_PI;
    const swathRadius = earthSize / 2;
  
    // Calculate swath edge points
    const leftSwathX = earthX + cos(swathStartAngle) * swathRadius;
    const leftSwathY = earthY + sin(swathStartAngle) * swathRadius;
  
    const rightSwathX = earthX + cos(swathEndAngle) * swathRadius;
    const rightSwathY = earthY + sin(swathEndAngle) * swathRadius;
  
    // Left panel to left swath edge
    line(satX - satSize * 3, satY, leftSwathX, leftSwathY);
    
    // Right panel to right swath edge
    line(satX + satSize * 3, satY, rightSwathX, rightSwathY);
  }
  