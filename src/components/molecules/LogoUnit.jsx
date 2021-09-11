import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'
import { moveInTop } from '../atoms/Transitions'
import { ReactComponent as Logo } from '../../images/logo.svg'
import {
  minimal as styleMinimal,
  logounit,
  logo,
  title,
  description
} from './LogoUnit.module.css'
import { useResume } from '../../hooks/use-resume'

LogoUnit.propTypes = {
  minimal: PropTypes.bool,
  isResume: PropTypes.bool
}

export default function LogoUnit({ minimal }) {
  const { basics } = useResume()

  return (
    <motion.div
      variants={moveInTop}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <Link className={minimal ? styleMinimal : logounit} to={'/'}>
        <Logo className={logo} />
        <h1 className={`p-name ${title}`}>{basics.name.toLowerCase()}</h1>
        <p className={`p-job-title ${description}`}>
          {basics.label.toLowerCase()}
        </p>
      </Link>
    </motion.div>
  )
}
