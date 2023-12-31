import { player } from "../player";
import { CONST } from "../CONST/const";
import { map } from "../map";

export const canvas = document.createElement("canvas");
canvas.setAttribute("width", CONST.SCREEN_WIDTH);
canvas.setAttribute("height", CONST.SCREEN_HEIGHT);
document.body.appendChild(canvas);

export const context = canvas.getContext("2d");

export function renderMinimap(posX = 0, posY = 0, scale, rays) {
	const cellSize = scale * CONST.CELL_SIZE;
	map.forEach((row, y) => {
		row.forEach((cell, x) => {
			if (cell) {
				context.fillStyle = "grey";
				context.fillRect(
					posX + x * cellSize,
					posY + y * cellSize,
					cellSize,
					cellSize
				);
			}
		});
	});
	context.fillStyle = "blue";
	context.fillRect(
		posX + player.x * scale - 10 / 2,
		posY + player.y * scale - 10 / 2,
		10,
		10
	);

	context.strokeStyle = "blue";
	context.beginPath();
	context.moveTo(player.x * scale, player.y * scale);
	context.lineTo(
		(player.x + Math.cos(player.angle) * 20) * scale,
		(player.y + Math.sin(player.angle) * 20) * scale
	);
	context.closePath();
	context.stroke();

	context.strokeStyle = CONST.COLORS.rays;
	rays.forEach((ray) => {
		context.beginPath();
		context.moveTo(player.x * scale, player.y * scale);
		context.lineTo(
			(player.x + Math.cos(ray.angle) * ray.distance) * scale,
			(player.y + Math.sin(ray.angle) * ray.distance) * scale
		);
		context.closePath();
		context.stroke();
	});
}

export function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function outOfMapBounds(x, y) {
	return x < 0 || x >= map[0].length || y < 0 || y >= map.length;
}

export function getVCollision(angle) {
	const right = Math.abs(Math.floor((angle - Math.PI / 2) / Math.PI) % 2);

	const firstX = right
		? Math.floor(player.x / CONST.CELL_SIZE) * CONST.CELL_SIZE + CONST.CELL_SIZE
		: Math.floor(player.x / CONST.CELL_SIZE) * CONST.CELL_SIZE;

	const firstY = player.y + (firstX - player.x) * Math.tan(angle);

	const xA = right ? CONST.CELL_SIZE : -CONST.CELL_SIZE;
	const yA = xA * Math.tan(angle);

	let wall;
	let nextX = firstX;
	let nextY = firstY;
	while (!wall) {
		const cellX = right
			? Math.floor(nextX / CONST.CELL_SIZE)
			: Math.floor(nextX / CONST.CELL_SIZE) - 1;
		const cellY = Math.floor(nextY / CONST.CELL_SIZE);

		if (outOfMapBounds(cellX, cellY)) {
			break;
		}
		wall = map[cellY][cellX];
		if (!wall) {
			nextX += xA;
			nextY += yA;
		} else {
		}
	}
	return {
		angle,
		distance: distance(player.x, player.y, nextX, nextY),
		vertical: true,
	};
}

export function getHCollision(angle) {
	const up = Math.abs(Math.floor(angle / Math.PI) % 2);
	const firstY = up
		? Math.floor(player.y / CONST.CELL_SIZE) * CONST.CELL_SIZE
		: Math.floor(player.y / CONST.CELL_SIZE) * CONST.CELL_SIZE +
			CONST.CELL_SIZE;
	const firstX = player.x + (firstY - player.y) / Math.tan(angle);

	const yA = up ? -CONST.CELL_SIZE : CONST.CELL_SIZE;
	const xA = yA / Math.tan(angle);

	let wall;
	let nextX = firstX;
	let nextY = firstY;
	while (!wall) {
		const cellX = Math.floor(nextX / CONST.CELL_SIZE);
		const cellY = up
			? Math.floor(nextY / CONST.CELL_SIZE) - 1
			: Math.floor(nextY / CONST.CELL_SIZE);

		if (outOfMapBounds(cellX, cellY)) {
			break;
		}

		wall = map[cellY][cellX];
		if (!wall) {
			nextX += xA;
			nextY += yA;
		}
	}
	return {
		angle,
		distance: distance(player.x, player.y, nextX, nextY),
		vertical: false,
	};
}

export function castRay(angle) {
	const vCollision = getVCollision(angle);
	const hCollision = getHCollision(angle);

	return hCollision.distance >= vCollision.distance ? vCollision : hCollision;
}

export function fixFishEye(distance, angle, playerAngle) {
	const diff = angle - playerAngle;
	return distance * Math.cos(diff);
}

export function getRays() {
	const initialAngle = player.angle - CONST.FOV / 2;
	const numberOfRays = CONST.SCREEN_WIDTH;
	const angleStep = CONST.FOV / numberOfRays;
	return Array.from({ length: numberOfRays }, (_, i) => {
		const angle = initialAngle + i * angleStep;
		const ray = castRay(angle);
		return ray;
	});
}

export function renderScene(rays) {
	rays.forEach((ray, i) => {
		const distance = fixFishEye(ray.distance, ray.angle, player.angle);
		const wallHeight = ((CONST.CELL_SIZE * 5) / distance) * 277;
		context.fillStyle = ray.vertical
			? CONST.COLORS.wallDark
			: CONST.COLORS.wall;
		context.fillRect(
			i,
			CONST.SCREEN_HEIGHT / 2 - wallHeight / 2,
			1,
			wallHeight
		);
		context.fillStyle = CONST.COLORS.floor;
		context.fillRect(
			i,
			CONST.SCREEN_HEIGHT / 2 + wallHeight / 2,
			1,
			CONST.SCREEN_HEIGHT / 2 - wallHeight / 2
		);
		context.fillStyle = CONST.COLORS.ceiling;
		context.fillRect(i, 0, 1, CONST.SCREEN_HEIGHT / 2 - wallHeight / 2);
	});
}
