import React, { Fragment, useState, useEffect } from 'react'
import { Category } from '../Category'
import { List, Item } from './styles'

function useCategoriesData () {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  useEffect(() => {
    setLoading(true)
    window.fetch('https://petgram-server-dramirez-m36q8d9yh.now.sh/categories')
      .then(res => res.json())
      .then(response => {
        setCategories(response)
        setLoading(false)
      })
  }, [])
  return { categories, loading }
}

export const ListOfCategories = () => {
  const { categories, loading } = useCategoriesData()
  const [showFixed, setShowFixed] = useState(false)

  useEffect(() => {
    const onScroll = e => {
      const newShowFixed = window.scrollY > 200
      showFixed !== newShowFixed && setShowFixed(newShowFixed)
    }
    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [showFixed])

  const renderList = (fixed) => (
    <List fixed={fixed}>
      {
        loading ? <Item key='loading'><Category /></Item>
          : categories.map(category =>
            <Item key={category.id}>
              {/** Rest operator */}
              <Category {...category} />
            </Item>
          )
      }
    </List>
  )

  return (
    <Fragment>
      {renderList()}
      {showFixed && renderList(true)}
    </Fragment>
  )
}
