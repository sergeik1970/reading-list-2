import _ from 'lodash'


const Paginaton = (props) => {

    const { itemsCount, pageSize, currentPage, onPageChange } = props;

    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1 && currentPage === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return (
        <nav>
            <ul className = "pagination">
                {pages.map(page => (
                    <li key = {page} className = {page === currentPage ? 'page-item active' : 'page-item'}>
                        <span role="button" className ="page-link" onClick={() => onPageChange(page)}>
                            {page}
                        </span>

                    </li>
                ))}
            </ul>
        </nav>
    );
}
 
export default Paginaton;