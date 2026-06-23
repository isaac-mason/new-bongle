import {
    ENVIRONMENT_OVERWORLD,
    env,
    getTrait,
    matchmaking,
    onInit,
    onJoin,
    script,
    setEnvironment,
    setEnvironmentTime,
    setPosition,
    TransformTrait,
    use,
    WorldTrait,
} from 'bongle';
import { blocks } from 'bongle/starter';

// register all of the starter blocks so they show up in the editor
use(blocks);

// set the max player count for matchmaking
matchmaking({ maxPlayers: 32 });

// sky + a late-morning sun
script(
    WorldTrait,
    'environment',
    (ctx) => {
        onInit(ctx, () => {
            setEnvironment(ctx, ENVIRONMENT_OVERWORLD);
            setEnvironmentTime(ctx, 9);
        });
    },
    { editor: true },
);

// spawn position for joining players
script(WorldTrait, 'spawn', (ctx) => {
    // server script
    if (!env.server) return;

    // spawn position
    onJoin(ctx, ({ playerNode }) => {
        const transform = getTrait(playerNode, TransformTrait)!;
        setPosition(transform, [0, 5, 0]);
    });
});
