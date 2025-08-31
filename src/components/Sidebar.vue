<template>
    <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
        <div class="logo flex items-center">
            <img src="../assets/icons/skn_kapital_icon.jpg" alt="Logo" class="w-8 mr-2" />
            <span class="name">SKN Kapitał</span>   
        </div>

        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="ToggleMenu" style="background: none;">
                <!-- <span class="material-icons">dashboard_customize</span> -->
                <span class="material-icons">keyboard_double_arrow_right</span>
            </button>
        </div>

		<h3>Menu</h3>
        <div class="menu">
            <router-link class="button" to="/dashboard">
                <span class="material-icons">dashboard_customize</span>
                <span class="menu-text">Dashboard</span>
            </router-link>

            <router-link class="button" to="/event-management">
                <span class="material-icons">calendar_month</span>
                <span class="menu-text">Organizacja Wydarzeń</span>
            </router-link>

            <router-link class="button" to="/publication-schedule">
                <span class="material-icons">description</span>
                <span class="menu-text">Harmonogram Publikacji</span>
            </router-link>
            <!-- <span class="material-symbols-outlined">event_note</span> -->
            <!-- <span class="material-symbols-outlined">perm_contact_calendar</span> -->
            <!-- <router-link class="button" to="/members">
                <span class="material-icons">group</span>
                <span class="menu-text">Członkowie</span>
            </router-link> -->
            <!-- <router-link class="button has-submenu" to="/members">
                <span class="material-icons">group</span>
                <span class="menu-text">Członkowie</span>
            </router-link> -->

            <div class="button has-submenu" @click="toggleSubmenu('members')">
                <span class="material-icons">group</span>
                <span class="menu-text">Członkowie</span>
                <span class="material-icons arrow" :class="{open: submenuOpen === 'members'}">
                    keyboard_arrow_right
                </span>
            </div>
            <div v-if="submenuOpen === 'members'" class="submenu">
                <router-link class="sub-button" to="/members/access">Menadżer dostępu</router-link>
                <router-link class="sub-button" to="/members/supervisors">Opiekunowie</router-link>
                <router-link class="sub-button" to="/members/board">Zarząd Koła</router-link>
                <router-link class="sub-button" to="/members/list">Członkowie</router-link>
                <router-link class="sub-button" to="/members/guests">Goście</router-link>
                <router-link class="sub-button" to="/members/consequences">Konsekwencje</router-link>
            </div>

            <router-link class="button" to="/mailings">
                <span class="material-icons">mail</span>
                <span class="menu-text">Mailing</span>
            </router-link>
            <router-link class="button" to="/tools">
                <span class="material-icons">build</span>
                <span class="menu-text">Tools</span>
            </router-link>
        </div>

        <div style="flex: 1 1 0;"></div>

        <div class="menu">
            <router-link class="button" to="/settings">
                <span class="material-icons">settings</span>
                <span class="menu-text">Settings</span>
            </router-link>
        </div>
    </aside>

</template>

<script setup>
import { ref } from 'vue';

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
}


const submenuOpen = ref(null)

const toggleSubmenu = (menu) => {
  submenuOpen.value = submenuOpen.value === menu ? null : menu
}
</script>

<style lang="scss" scoped>
.submenu {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-top: 0.2rem;

  .sub-button {
    display: block;
    padding: 0.3rem 1rem;
    text-decoration: none;
    color: var(--light);
    font-size: 0.9rem;
    transition: 0.2s;

    &:hover, &.router-link-exact-active {
      color: var(--primary);
    }
  }
}

.button.has-submenu {
  justify-content: space-between;
  align-items: center;

  .arrow {
    transition: transform 0.2s;
  }

  .arrow.open {
    transform: rotate(90deg);
  }
}

aside {
    display: flex;
    flex-direction: column;
    width: calc(2rem + 32px); // padding + icon size
    min-height: 100vh;
    overflow: hidden;
    padding: 1rem;

    background-color: var(--dark);
    color: var(--light);

    transition: 0.2s ease-out;

    // .flex {
    //     flex: 1 1 0;
    // }

    .logo {
		margin-bottom: 1rem;

        .name {
            opacity: 0; //  chemy widzieć tekstu kiedy menu jest rozwinięte
            transition: 0.2s ease-out;

            color: var(--light);
            position: relative;
            // top: -1rem;
        }

		img {
            transition: 0.2s ease-out;
		}
	}

    .menu-toggle-wrap {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;

        position: relative;
        top: -1rem;
        transition: 0.2s ease-out;

        .menu-toggle {
            transition: 0.2s ease-out;

            .material-icons {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s ease-out;
            }

            &:hover {
                .material-icons {
                    color: var(--primary);
                    transform: translateX(0.5rem);
                }
            }
        }
    }

    h3, .button .menu-text {
		opacity: 0; // nie chemy widzieć tekstu kiedy menu jest zwinięte
		transition: opacity 0.3s ease-in-out;
	}

    h3 {
        color: var(--grey);
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    .menu {
        margin: 0 -1rem;

        .button {
			display: flex;
			align-items: center;
			text-decoration: none;

            padding: 0.5rem 1rem; // odsrtepy miedzy elementami menu
            transition: 0.2 ease-out;

            .material-icons {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s ease-out;
            }

            .menu-text {
                color: var(--light);
                transition: 0.2s ease-out;
            }

            &:hover, &.router-link-exact-active {
                background-color: var(--dark-alt);

                .material-icons, .menu-text {
                    color: var(--primary);
                }
            }
            
            &.router-link-exact-active {
                border-right: 5px solid var(--primary);
            }
        }
    }
    &.is-expanded {
        width: var(--sidebar-width);

        .logo {
            .name {
                opacity: 1;
                transition: 0.2s ease-out;
                margin-left: 1rem;

                font-size: 1.2rem;
                font-weight: 600;
            }
    
            img {
                width: 3rem;
                transition: 0.2s ease-out;
            }
        }

        // zachowanie strzełki "<<" rozwijającej menu" 
        .menu-toggle-wrap {
            top: -4rem;

            .menu-toggle {
                transform: rotate(-180deg);
            }
        }

        h3, .button .menu-text {
            opacity: 1; //  chemy widzieć tekstu kiedy menu jest rozwinięte
        }

        .button {
            .material-icons {
                margin-right: 1rem;;
            }
        }
    }
    @media (max-width: 768px) {
        position: fixed;
        z-index: 99;   
    }

    
}
</style>
