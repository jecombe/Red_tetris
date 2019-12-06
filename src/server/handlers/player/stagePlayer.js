import { is_full } from './utils';

const updateStage = (piece, newStage, obj) => {

    piece.form.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                newStage[y + obj.pos.y][x + obj.pos.x] = [
                    value,
                    `${obj.collided ? 'merged' : 'clear'}`,
                ];
            }
        });
    });
    return newStage
}

export const flushUpdate = (piece, obj, objGame) => {
    const newStage = obj.stage.map((row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
    return updateStage(piece, newStage, obj)
};

export const updatePlayerPosition = (x, y, obj) => {
    obj.setPosition(x, y);
    return flushUpdate(obj.piece, obj);
};

export const updateStagingBeforeCollision = (piece, obj) => {
    obj.setCollidedTrue();
    return updateStage(piece, obj.stage, obj)
};

export const updateStagingAfterCollision = (piece, obj) => {
    obj.setPositionNull();
    obj.setCollidedFalse();
    obj.setPosition(10 / 2 - 2, 0);
    return updateStage(piece, obj.stage, obj)
};

export const updatePlayerPositionCollision = (x, y, obj, objGame) => {
    obj.setPosition(x, y);
    return flushUpdate(obj.piece, obj, 0);
};

export const updateRows = (newStage) => {
    // Pour la hauteur verifie si une ligne est pleine
    newStage.forEach((row) => {
        const full_line = row.every(is_full);
        if (full_line === true) {
            // Check l'index de la ligne pleine;
            const index = newStage.indexOf(row);
            // Met la ligne a 0
            row.fill([0, 'clear']);
            // Supprime la ligne avec l'index et decalle e tableau, il restera non pas 20 de hauteur mais 19
            newStage.splice(index, 1);
            // Ajoute au debut du tableau un nouveau tableau de 10 a 0
            newStage.unshift(new Array(10).fill([0, 'clear']));
        }
    });
    return (newStage);
};