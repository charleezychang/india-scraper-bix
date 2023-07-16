import { Button, CardBody, CardHeader, Text, Input, VStack, Divider, Tooltip, HStack, Flex, Box } from '@chakra-ui/react'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { Card } from '../interfaces'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

function FlashCardSkeleton() {

  return (
    <Box className='tw-w-full tw-my-4'>
      <SkeletonText marginX={'16px'} color='brand.text' skeletonHeight='5' marginBottom={'16px'} />
      <SkeletonText marginX={'16px'} color='brand.text' skeletonHeight='5' noOfLines={4} marginBottom={'16px'} />
      <Divider color='brand.text' className='tw-mb-4' />
      <SkeletonText marginX={'16px'} color='brand.text' skeletonHeight='5' noOfLines={2} marginBottom={'16px'} />
      <Divider color='brand.text' className='tw-mb-4' />
      <SkeletonText marginX={'16px'} color='brand.text' skeletonHeight='5' />
    </Box>
  )
}

export default FlashCardSkeleton