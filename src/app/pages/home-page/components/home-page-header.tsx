import { store } from "../../play-game/ui/store"


const HomePageHeader: React.FC = () => {
    return (
        <div className="main-page-header">
            <div className="main-page-header-content">
                <div className="main-page-header-content-avatar-border">
                        <img src={store.getState().user.photo_url} />
                    
                </div>
                <div className="main-page-header-content-data">
                    <div className="main-page-header-content-data-username">
                        {store.getState().user.first_name || "Guest"}
                    </div>
                    <div className="main-page-header-content-data-credits">
                        <div className="main-page-header-content-data-credits-1">
                            <div className="main-page-header-content-data-credits-1-icon"></div>
                            <div className="main-page-header-content-data-credits-1-value">
                                100K
                            </div>
                        </div>
                        <div className="main-page-header-content-data-credits-1">
                            <div className="main-page-header-content-data-credits-2-icon"></div>
                            <div className="main-page-header-content-data-credits-1-value">
                                152.5K
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HomePageHeader