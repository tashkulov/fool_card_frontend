import {RouteProps} from "react-router-dom"
import HomePage from "../../pages/home-page/home-page.tsx";
import PlayGame from "../../pages/play-game/play-game.tsx";
import Kvesty from "../../pages/kwesty/Kvesty.tsx";
import {LeaderBoard} from "../../pages/LeaderBoard";
import NewGame from "../../pages/new-game/new-game.tsx";
import {Referrals} from "../../pages/Referrals";
import OpenGames from "../../pages/open-games/open-games.tsx";

enum AppRoutes {
    HOMEPAGE = "homePage",
    PLAYGAME = "inGame",
    QUESTS = "quests",
    LEADERBOARD = "leaderBoard",
    NEWGAME = "newGame",
    OPENGAMES = "open-games",
    REFERRALS = "referrals",
    NOT_FOUND = "not_found",
}

export type AppRouteProps = RouteProps &NonNullable<unknown>

export const RoutePaths: Record<AppRoutes, string> = {
    [AppRoutes.HOMEPAGE]: "",
    [AppRoutes.PLAYGAME]: "/inGame",
    [AppRoutes.LEADERBOARD]: "/leaderBoard",
    [AppRoutes.OPENGAMES]: "/open-games",
    [AppRoutes.NEWGAME]: "/newGame",
    [AppRoutes.REFERRALS]: "/referrals",
    [AppRoutes.QUESTS]: "/quests",
    [AppRoutes.NOT_FOUND]: "*"
};


export const routerConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.HOMEPAGE]: {
        path: RoutePaths.homePage,
        element: <HomePage/>
    },
    [AppRoutes.PLAYGAME]: {
        path: RoutePaths.inGame,
        element: <PlayGame/>
    },
    [AppRoutes.OPENGAMES]: {
        path: RoutePaths["open-games"],
        element: <OpenGames />,
    },
    [AppRoutes.QUESTS]: {
        path: RoutePaths.quests,
        element: <Kvesty/>
    },
    [AppRoutes.LEADERBOARD]: {
        path: RoutePaths.leaderBoard,
        element: <LeaderBoard/>
    },
    [AppRoutes.NEWGAME]: {
        path: RoutePaths.newGame,
        element: <NewGame/>
    },
    [AppRoutes.REFERRALS]: {
        path: RoutePaths.referrals,
        element: <Referrals/>
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePaths.not_found,
        element: <div>Not Found</div>
    }
};
