export const DashboardCardPagination = ({cardPaginationHandler}) => {
  return (
    <div className="btn-group justify-center">
            <button
              className="btn"
              onClick={() => cardPaginationHandler("prev")}
            >
              «
            </button>
            <button className="btn">{cardPaginationHandler("showPage")}</button>
            <button
              className="btn"
              onClick={() => cardPaginationHandler("next")}
            >
              »
            </button>
          </div>
  )
}
