export const DashboardDeckPagination = ({deckPaginationHandler}) => {
  return (
    <div className="btn-group justify-center w-full">
            <button
              className="btn btn-primary"
              onClick={() => deckPaginationHandler("prev")}
            >
              «
            </button>
            <button className="btn btn-primary">{deckPaginationHandler("showPage")}</button>
            <button
              className="btn btn-primary"
              onClick={() => deckPaginationHandler("next")}
            >
              »
            </button>
          </div>
  )
}
