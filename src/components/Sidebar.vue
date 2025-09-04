<template>
    <aside>
        <div class="menu" :class="`${is_expanded ? 'is-expanded' : ''}`">
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
            <div class="menu-list">
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

                <!-- 🔽 zamiast router-link robimy toggle -->
                 <!-- Dzięki temu przycisk „Członkowie” dostaje klasę router-link-exact-active, kiedy jesteś w którymś z jego podlinków – i odziedziczy te same style (border-right, kolor ikon, tło). -->
                <div 
                    class="button"
                    :class="{ 'router-link-exact-active': isMembersActive }"
                    @click="toggleSubmenu('members')"
                >
                    <span class="material-icons">group</span>
                    <span class="menu-text">Członkowie</span>
                    <span class="material-icons arrow" :class="{ open: activeSubmenu === 'members' }">
                        keyboard_arrow_right
                    </span>
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

            <div class="menu-list">
                <router-link class="button" to="/settings">
                    <span class="material-icons">settings</span>
                    <span class="menu-text">Settings</span>
                </router-link>
            </div>
        </div>


        <!-- Submenu panel (poziomy) -->
        <transition name="submenu">
            <div v-show="activeSubmenu === 'members'" 
                class="submenu-panel" 
                :class="{ 'is-active': activeSubmenu === 'members' }">
            <router-link class="button" to="/members/access" @click="selectSubmenuItem">
                <span class="menu-text">Menadżer dostępu</span>
            </router-link>
            <router-link class="button" to="/members/supervisors" @click="selectSubmenuItem">
                <span class="menu-text">Opiekunowie</span>
            </router-link>
            <router-link class="button" to="/members/board" @click="selectSubmenuItem">
                <span class="menu-text">Zarząd Koła</span>
            </router-link>
            <router-link class="button" to="/members/list" @click="selectSubmenuItem">
                <span class="menu-text">Członkowie</span>
            </router-link>
            <router-link class="button" to="/members/guests" @click="selectSubmenuItem">
                <span class="menu-text">Goście</span>
            </router-link>
            <router-link class="button" to="/members/consequences" @click="selectSubmenuItem">
                <span class="menu-text">Konsekwencje</span>
                </router-link>
            </div>
        </transition>
    </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")
const activeSubmenu = ref(null)
const route = useRoute()
const isMembersActive = computed(() => route.path.startsWith('/members'))

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value
  localStorage.setItem("is_expanded", is_expanded.value)
}

const toggleSubmenu = (menu) => {
  activeSubmenu.value = activeSubmenu.value === menu ? null : menu
}

const selectSubmenuItem = () => {
  // zostawiamy submenu otwarte
  is_expanded.value = false        // zwijamy główne menu
  localStorage.setItem("is_expanded", false)
}


// do zamykania submenu po zmianie strony na inną niż /members
watch(
  () => route.path,
  (newPath) => {
    if (!newPath.startsWith('/members')) {
      activeSubmenu.value = null
    }
  }
)
</script>

<style lang="scss" scoped>
aside {
    display: flex;
    height: 100%;

    background-color: var(--dark);
    color: var(--light);

    .button {
        display: flex;
        align-items: center;
        text-decoration: none;

        padding: 0.5rem 1rem; // odstepy miedzy elementami menu
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

        // for `members` submenu arrow
        .material-icons.arrow {
            margin-right: 0px !important;
            margin-left: auto;          // przykleja do prawej
            transition: transform 0.3s ease;
        }

        .arrow.open {
            transform: rotate(-180deg);
        }
    }

    .menu {
        display: flex;
        flex-direction: column;
        width: calc(2rem + 32px); // padding + icon size
        min-height: 100vh;
        overflow: hidden;
        padding: 1rem;

        background-color: var(--dark);
        color: var(--light);

        transition: 0.2s ease-out;

        border-right: 2px solid var(--primary);
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

        .menu-list {
            margin: 0 -1rem;
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
}

.submenu-panel {
    overflow: hidden;       /* ukryj zawartość przy zwijaniu */
    display: flex;
    flex-direction: column;
    padding: 1rem; /* padding znika przy zamknięciu */
    box-shadow: 2px 0 5px rgba(0,0,0,0.2);
    transition: width 0.3s ease;   /* kluczowe! */
}

/* gdy submenu aktywne */
.submenu-panel.is-active {
  width: 250px;   /* docelowa szerokość */
  padding: 1rem 0rem;  /* dopiero w tym stanie pełne paddingi */
}


/* animacja przesuwania w bok */
.submenu-enter-active,
.submenu-leave-active {
//   transition: width 0.3s ease, padding 0.3s ease;
  transition: max-width 0.3s ease, padding 0.3s ease;
}

.submenu-enter-from,
.submenu-leave-to {
    max-width: 0;
    padding-left: 0;
    padding-right: 0;
}

.submenu-enter-to,
.submenu-leave-from {
    max-width: 250px; /* docelowa szerokość */
    padding-left: 1rem;
    padding-right: 1rem;
}
</style>
