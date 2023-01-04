import React, { useState } from 'react';
import styles from './filterBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { filterProducts } from '../../store/actions/productActions';
import Button from '../UI/Button';
const FilterBar = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    // put all the categories of products to a new array
    const category = products.map((item) => {
        return item.category;
    });
    // remove duplicate category in the array
    let categories = category.filter((c, index) => {
        return category.indexOf(c) === index;
    });

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('sort');
    const [categorySelect, setCategorySelect] = useState('all');

    // const onFilterHandler = () => {
    //     const filteredItems = products.filter((item) => {
    //         return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
    //     });
    //     const catergorySort = filteredItems.filter((item) => {
    //         if (categorySelect === 'All') {
    //             return item;
    //         } else {
    //             return item.category === categorySelect;
    //         }
    //     });
    //     const sortedItems = catergorySort.sort((a, b) => {
    //         return b.rating - a.rating;
    //     });
    // };

    return (
        <div className={styles.filterContainer}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search products"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    className={styles.input}
                />
            </div>
            <div className={styles.sortContainer}>
                <select
                    name="sort"
                    id="sort"
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value);
                    }}
                    className={styles.select}
                >
                    <option value="sort">Sort</option>;
                    <option value="highRatings">High Ratings</option>
                    <option value="lowRatings">Low Ratings</option>
                    <option value="Ascending">Price Ascending</option>
                    <option value="Descending">Price Descending</option>
                </select>
            </div>
            <div className={styles.categoryContainer}>
                <select
                    name="category"
                    id="category"
                    value={categorySelect}
                    onChange={(e) => {
                        setCategorySelect(e.target.value);
                    }}
                    className={styles.select}
                >
                    <option value="all">All</option>;
                    {categories.map((item, i) => {
                        return (
                            <option key={i} value={item}>
                                {item}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className={styles.btnContainer}>
                <Button
                    className={styles.filterBtn}
                    onClick={() => {
                        dispatch(filterProducts(search, sort, categorySelect));
                    }}
                >
                    Filter
                </Button>
            </div>
        </div>
    );
};

export default FilterBar;
