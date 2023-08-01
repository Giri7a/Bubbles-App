<!DOCTYPE html>
<html>
<head>
    <title>Bubbles App</title>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <canvas id="myCanvas" width="500" height="200"></canvas>
    <button id="resetButton">Reset</button>

    <script>
        // Module 1
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');

        const circleColors = ['red', 'green', 'blue', 'yellow'];

        // Draw circles on the left side of the canvas
        function drawCircles() {
            const circleRadius = 30;
            const circleSpacing = 80;
            const startX = 50;
            const centerY = canvas.height / 2;

            for (let i = 0; i < circleColors.length; i++) {
                const x = startX + i * circleSpacing;
                ctx.beginPath();
                ctx.arc(x, centerY, circleRadius, 0, Math.PI * 2);
                ctx.fillStyle = circleColors[i];
                ctx.fill();
                ctx.closePath();
            }
        }

        // Draw arrows on the right side of the canvas
        function drawArrows() {
            const arrowStartX = 300;
            const arrowEndX = 450;
            const arrowYSpacing = 50;
            const centerY = canvas.height / 2;

            for (let i = 0; i < circleColors.length; i++) {
                const y = centerY - (circleColors.length / 2) * arrowYSpacing + i * arrowYSpacing;
                ctx.beginPath();
                ctx.moveTo(arrowStartX, y);
                ctx.lineTo(arrowEndX, y);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
            }
        }

        drawCircles();
        drawArrows();

        // Module 2
        canvas.addEventListener('click', handleClick);

        function handleClick(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const circleRadius = 30;
            const circleSpacing = 80;
            const startX = 50;
            const centerY = canvas.height / 2;

            for (let i = 0; i < circleColors.length; i++) {
                const circleX = startX + i * circleSpacing;
                const circleY = centerY;
                const distance = Math.sqrt((circleX - x) ** 2 + (circleY - y) ** 2);

                if (distance <= circleRadius) {
                    animateArrow(circleX, circleY, i);
                    break;
                }
            }
        }

        function animateArrow(circleX, circleY, circleIndex) {
            const arrowStartX = 300;
            const arrowEndX = 450;
            const arrowYSpacing = 50;
            const centerY = canvas.height / 2;
            const arrowY = centerY - (circleColors.length / 2) * arrowYSpacing + circleIndex * arrowYSpacing;

            const arrow = {
                x: arrowStartX,
                y: arrowY,
                speed: 2,
                reachedTarget: false
            };

            function moveArrow() {
                ctx.clearRect(arrowStartX - 1, arrowY - 1, arrowEndX - arrowStartX + 2, 2);
                ctx.beginPath();
                ctx.moveTo(arrow.x, arrow.y);
                ctx.lineTo(arrow.x + arrow.speed, arrow.y);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();

                arrow.x += arrow.speed;

                if (arrow.x >= arrowEndX) {
                    arrow.reachedTarget = true;
                    changeCircleColor(circleIndex);
                }

                if (!arrow.reachedTarget) {
                    requestAnimationFrame(moveArrow);
                }
            }

            moveArrow();
        }

        function changeCircleColor(circleIndex) {
            const circleRadius = 30;
            const circleSpacing = 80;
            const startX = 50;
            const centerY = canvas.height / 2;

            const x = startX + circleIndex * circleSpacing;
            const y = centerY;

            ctx.clearRect(x - circleRadius, y - circleRadius, circleRadius * 2, circleRadius * 2);
            ctx.beginPath();
            ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
            ctx.fillStyle = 'purple';
            ctx.fill();
            ctx.closePath();
        }

        // Reset button
        const resetButton = document.getElementById('resetButton');
        resetButton.addEventListener('click', resetApp);

        function resetApp() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCircles();
            drawArrows();
        }
    </script>
</body>
</html>
