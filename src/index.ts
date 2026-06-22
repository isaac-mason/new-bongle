import {
    addTrait,
    CharacterControllerTrait,
    CharacterTrait,
    env,
    getTrait,
    matchmaking,
    onInit,
    onJoin,
    PlayerControllerTrait,
    script,
    setBlock,
    setPosition,
    trait,
    TransformTrait,
    use,
} from 'bongle';
import { blocks } from 'bongle/starter';

use(blocks);

matchmaking({ maxPlayers: 4 });

const HelloTrait = trait('hello');

script(HelloTrait, 'session', (ctx) => {
    if (!env.server) return;

    onInit(ctx, () => {
        // a checkerboard platform to say hello
        const size = 8;
        for (let x = -size; x <= size; x++) {
            for (let z = -size; z <= size; z++) {
                const kind = (x + z) % 2 === 0 ? blocks.grass : blocks.stone;
                setBlock(ctx.voxels, x, 0, z, kind.defaultKey());
            }
        }

        // a little plinth at spawn
        for (let x = -1; x <= 1; x++) {
            for (let z = -1; z <= 1; z++) {
                setBlock(ctx.voxels, x, 1, z, blocks.cobblestone.defaultKey());
            }
        }
    });

    onJoin(ctx, ({ playerNode }) => {
        const transform = getTrait(playerNode, TransformTrait)!;
        setPosition(transform, [0, 4, 0]);

        addTrait(playerNode, CharacterControllerTrait);
        addTrait(playerNode, CharacterTrait);
        addTrait(playerNode, PlayerControllerTrait);
    });
});
