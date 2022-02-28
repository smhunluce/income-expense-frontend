import React, {useState, useEffect} from "react";
import apiClient from "../http-common";
import Navbar from "./Navbar";
// @ts-ignore
import {useTable} from 'react-table'
import {Link,Navigate} from 'react-router-dom';


function goToPage(page: any) {
    Navigate({
        to: '?page=' + page,
    });
}

// @ts-ignore
function CategoryTable({columns, data, rowProps, pagination}) {
    const {
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data});

    return (
        <div>
            <table className="table table-bordered bg-light">
                <thead>
                {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; headers: any[]; }) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {rows.map((row: { getRowProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; cells: any[]; }, index: string | number) => {
                    prepareRow(row);
                    return (
                        <tr className={typeof rowProps[index] === 'object' ? rowProps[index].className : ''}>
                            {row.cells.map(cell => {
                                return (
                                    <td>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <nav>
                <ul className="pagination justify-content-center">
                    {pagination.map((row: { url: any; active: boolean; label: string; }) => {
                        let linkclass = '';
                        let page = 1;
                        if (row.url == null) {
                            linkclass = 'disabled';
                        } else {
                            page = row.url.split(/[=]+/).pop();
                        }
                        if (row.active) {
                            linkclass = 'active';
                        }
                        return (
                            <li className={"page-item " + linkclass}>
                                <Link to={"?page=" + page} onClick={() => goToPage(page)} className="page-link">{row.label}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    );
}

function CategoryContainer() {
    const [categories, setCategories] = useState([]);
    const [classlist, setClasses] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [loading, setLoading] = useState(false);

    const queryParams = new URLSearchParams(window.location.search);
    let page = queryParams.get('page') ?? 1;

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('access-token') || '';
        apiClient.get('transactionCategory?page=' + page, {
            headers: {
                'Authorization': token
            }
        }).then(response => {
            const requiredDataFromResponse = response.data.categories.data;
            const data = requiredDataFromResponse.map((eachCategoryItem: { name: string; type: string; }) => ({
                name: eachCategoryItem.name,
                type: eachCategoryItem.type === 'income' ? 'Gelir' : 'Gider',
            }));
            const styles = requiredDataFromResponse.map((eachCategoryItem: { type: string; }) => ({
                className: eachCategoryItem.type === 'income' ? 'text-success' : 'text-danger',
            }));
            setCategories(data);
            setClasses(styles);
            setPagination(response.data.categories.links);
        })
            .catch(error => {
                if (error.response.status === 401) {
                    localStorage.clear();
                    window.location.reload();
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "Başlık",
                accessor: "name"
            },
            {
                Header: "Tür",
                accessor: "type"
            },
        ],
        []
    );

    if (categories.length === 0 && !loading) {
        return <div>Kategori Bulunamadı</div>;
    }

    return (
        <div>
            {loading && <span>Yükleniyor</span>}
            <CategoryTable columns={columns} data={categories} rowProps={classlist} pagination={pagination}/>
        </div>
    );
}

export default function Categories() {
    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="my-4">Kategoriler</h3>
                        <CategoryContainer/>
                    </div>
                </div>
            </div>
        </div>
    );
}

