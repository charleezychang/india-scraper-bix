import { Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import Import1 from '@/src/assets/images/Import1.png'
import Import2 from '@/src/assets/images/Import2.png'
import Image from 'next/image';
import PrimaryButton from './PrimaryButton';
import useImportCards from '../hooks/useImportCards';
import { ChangeEvent, useEffect, useState } from 'react';


interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function ImportModal({ isOpen, onClose }: Props) {
    const { scrapeWebsite, testScrape, isImporting } = useImportCards()
    const [urlToScrape, setUrlToScrape] = useState<string | null>(null)
    const [invalidUrl, setInvalidUrl] = useState<boolean>(false)

    useEffect(() => {
        if (!isImporting) {
            setUrlToScrape(null)
            onClose()
        }
    }, [isImporting])

    const handleImport = () => {
        // Insert scraper here
        if (urlToScrape) {
            scrapeWebsite(`https://api.scraperapi.com?api_key=${process.env.NEXT_PUBLIC_SCRAPER_API_SECRET_KEY}&url=${urlToScrape}`)
        }
        else {
            setInvalidUrl(true)
        }
    }

    const handleUrlToScrapeChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setInvalidUrl(false)
            setUrlToScrape(e.target.value)
        }
        else {
            setInvalidUrl(true)
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Importing from Indiabix</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Copy the URL of the last page of a section</p>
                        <Image src={Import1} alt='last-page' className='tw-border-2 tw-border-solid tw-border-black tw-mb-2' />
                        <Image src={Import2} alt='copy-url' className='tw-border-2 tw-border-solid tw-border-black' />
                    </ModalBody>

                    <ModalFooter className='tw-mb-2'>
                        <Input isInvalid={invalidUrl} className='tw-mr-2' placeholder='Paste URL here.' focusBorderColor='brand.accent' onChange={handleUrlToScrapeChange} />
                        <PrimaryButton displayText='Import' onClick={handleImport} isLoading={isImporting} width='100px' />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ImportModal