import './search.scss'
import { Nav } from '../../components/Nav/Nav'
import { Task } from '../../components/Task/Task'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import taskService from '../../services/task.service'
import useRenderVerification from '../../Hooks/useVerification'
import { Loading } from '../Loading/Loading'

export const Search = () => {
    const shouldRender = useRenderVerification()
    const [searchResults, setSearchResults] = useState<any>([])
    const query: any = useParams()

    const search = async (query: string) => {
        const result = await taskService.search(query)
        return result
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await search(query.query)
                setSearchResults(response)
            } catch (error) {
                console.error('Error during search')
            }
        }

        fetchData()
    }, [query])
    return (
        <div className='track-hui'>
            <Nav shouldRender={shouldRender}></Nav>
            {(shouldRender !== null ) ? (
                <>
                    {searchResults.length !== 0 ? (
                        <>
                            {searchResults?.map((item: any) => (
                                <Task
                                    shouldRender={shouldRender}
                                    name={item.name}
                                    description={item.description}
                                    date={item.date}
                                    tags={item.tag}
                                    user={item.user}
                                    key={item.id}
                                    id={item.id}
                                />
                            ))}
                        </>
                    ) : (
                        <div className='search-results-container'>
                            <p className='no-results-message'>No results found. Try a different search term.</p>
                        </div>
                    )}
                </>
            ) : (
                <></>
            )}
        </div>
    )
}
