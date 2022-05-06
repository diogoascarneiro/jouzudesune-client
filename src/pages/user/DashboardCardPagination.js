export const DashboardCardPagination = ({cardPaginationHandler}) => {
  return (
    <div className="btn-group justify-center">
            <button
              className="btn btn-primary"
              onClick={() => cardPaginationHandler("prev")}
            >
              «
            </button>
            <button className="btn btn-primary">{cardPaginationHandler("showPage")}</button>
            <button
              className="btn btn-primary"
              onClick={() => cardPaginationHandler("next")}
            >
              »
            </button>
          </div>
  )
}
